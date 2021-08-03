---
title: 如何在Golang中正确使用基本身份认证（HTTP Basic Authentication）
date: 2021-7-15
tags:
- basic-auth
- golang
- tutorial
author: mhxw
---

在Go1.4版本中引入了[HTTP基本身份认证模块](https://pkg.go.dev/net/http#Request.BasicAuth) 。

## 什么是基本认证？我应该在什么时候使用它？

作为开发人员，您可能访问受保护的网址时，Web 浏览器显示以下弹框。

![弹框截图](./../img/baig-1.jpg)

当您在此提示输入用户名和密码时，Web 浏览器将向服务器发送一个包含`Authorization`标头的 HTTP 请求，类似于：

```shell
Authorization: Basic YWxpY2U6cGE1NXdvcmQ=
```

```shell
Authorization: Basic base64encode(username+":"+password)
```

HTTP协议中的 `Authorization` 请求消息头含有服务器用于验证用户代理身份的凭证。格式是`Basic`字符串+空格+用户名:密码的Base64编码。在上述示例中，`YWxpY2U6cGE1NXdvcmQ=`= 是用户名:密码的base64编码。

当服务器收到这个请求时，它会从`Authorization`中解析用户名和密码并检查它们是否有效。如果凭据无效，服务器返回`401 Unauthorized`响应，浏览器可以再次显示弹框。

基本身份验证可用于许多不同的场景，但它通常适合于对安全性要求不高的系统或设备中。

为了提高其安全性，您可以：

- 只在 HTTPS 连接上使用它：如果您不使用 HTTPS，`Authorization`请求消息头可能会被攻击者拦截和解码，然后他们可以使用用户名和密码来访问您受保护的资源。

- 使用攻击者难以猜测或暴力破解的强密码。

## 保护 Web 应用程序

保护程序最简单的方法的是创建一些中间件。我们需要做到以下几点：

- 从`Authorization`请求消息头中解析用户名和密码（如果存在）。建议直接使用Go 1.4 中引入的方法：`r.BasicAuth()`。

- 将提供的用户名和密码与您期望的值进行比较。为了避免定时攻击的风险，你应该使用 Go 的`subtle.ConstantTimeCompare()`函数进行比较。

> 注意：
> 
> 在Go中（和大多数语言一样），普通的==比较运算符一旦发现两个字符串之间有差异，就会立即返回。因此，如果第一个字符是不同的，它将在只看一个字符后返回。从理论上讲，这为[定时攻击]()提供了机会，攻击者可以向你的应用程序发出大量请求，并查看平均响应时间的差异。他们收到401响应所需的时间可以有效地告诉他们有多少字符是正确的，如果有足够的请求，他们可以建立一个完整的用户名和密码的画像。像网络抖动这样的事情使得这种特定的攻击很难实现，但远程定时攻击已经成为现实，而且在未来可能变得更加可行。考虑到这个因素我们可以通过使用subtle.ConstantTimeCompare()很容易地防范这种风险，这样做是有意义的。

同样要注意的是，使用`subtle.ConstantTimeCompare()`可能会 [泄露有关用户名和密码长度的信息](https://github.com/golang/go/issues/18936) 。为了防范这种情况，我们应该在它们比较之前使用散列函数加密（比如：SHA-256）用户名和密码。使用加密后的用户名和密码镜像比较来防止`subtle.ConstantTimeCompare()` 提前返回。

- 如果用户名和密码不正确，或者请求不包含有效的`Authorization`消息头，那么中间件应该发送`401 Unauthorized`响应并设置 [WWW-Authenticate](https://datatracker.ietf.org/doc/html/rfc7235#section-4.1) 消息头以通知客户端应该使用基本身份验证来获得访问权限。否则，中间件应该允许请求进行下一步。

综上所述，实现中间件的案例如下所示：

```golang
func basicAuth(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Extract the username and password from the request 
        // Authorization header. If no Authentication header is present 
        // or the header value is invalid, then the 'ok' return value 
        // will be false.
		username, password, ok := r.BasicAuth()
		if ok {
            // Calculate SHA-256 hashes for the provided and expected
            // usernames and passwords.
			usernameHash := sha256.Sum256([]byte(username))
			passwordHash := sha256.Sum256([]byte(password))
			expectedUsernameHash := sha256.Sum256([]byte("your expected username"))
			expectedPasswordHash := sha256.Sum256([]byte("your expected password"))

            // 使用 subtle.ConstantTimeCompare() 进行校验
            // the provided username and password hashes equal the  
            // expected username and password hashes. ConstantTimeCompare
            // 如果值相等，则返回1，否则返回0。
            // Importantly, we should to do the work to evaluate both the 
            // username and password before checking the return values to 
            // 避免泄露信息。
			usernameMatch := (subtle.ConstantTimeCompare(usernameHash[:], expectedUsernameHash[:]) == 1)
			passwordMatch := (subtle.ConstantTimeCompare(passwordHash[:], expectedPasswordHash[:]) == 1)

            // If the username and password are correct, then call
            // the next handler in the chain. Make sure to return 
            // afterwards, so that none of the code below is run.
			if usernameMatch && passwordMatch {
				next.ServeHTTP(w, r)
				return
			}
		}

        // If the Authentication header is not present, is invalid, or the
        // username or password is wrong, then set a WWW-Authenticate 
        // header to inform the client that we expect them to use basic
        // authentication and send a 401 Unauthorized response.
		w.Header().Set("WWW-Authenticate", `Basic realm="restricted", charset="UTF-8"`)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	})
}
```

## 案例代码

至此，让我们编写一个小型但功能齐全的项目测试一下。

在您的计算机上创建一个新目录，添加一个`main.go`文件，初始化一个`mod`，并使用 [mkcert](https://github.com/FiloSottile/mkcert) 工具创建一对本地信任的 TLS 证书。就像这样：

```bash
$ mkdir basic-auth-example
$ cd basic-auth-example
$ touch main.go
$ go mod init example.com/basic-auth-example
go: creating new go.mod: module example.com/basic-auth-example
$ mkcert localhost
Created a new certificate valid for the following names 📜
     - "localhost"
    
    The certificate is at "./localhost.pem" and the key at "./localhost-key.pem" ✅
    
    It will expire on 21 September 2023 🗓
$ ls
go.mod  localhost-key.pem  localhost.pem  main.go
```

把以下代码复制到`mian.go`中

```shell
package main

import (
	"crypto/sha256"
	"crypto/subtle"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

type application struct {
	auth struct {
		username string
		password string
	}
}

func main() {
	app := new(application)

	app.auth.username = "mhxw"
	app.auth.password = "mhxw_password"

	if app.auth.username == "" {
		log.Fatal("basic auth username must be provided")
	}

	if app.auth.password == "" {
		log.Fatal("basic auth password must be provided")
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/unprotected", app.unprotectedHandler)
	mux.HandleFunc("/protected", app.basicAuth(app.protectedHandler))

	srv := &http.Server{
		Addr:         ":4000",
		Handler:      mux,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	log.Printf("starting server on %s", srv.Addr)
	err := srv.ListenAndServeTLS("./localhost.pem", "./localhost-key.pem")
	log.Fatal(err)
}

func (app *application) protectedHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "This is the protected handler")
}

func (app *application) unprotectedHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "This is the unprotected handler")
}

func (app *application) basicAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username, password, ok := r.BasicAuth()
		if ok {
			usernameHash := sha256.Sum256([]byte(username))
			passwordHash := sha256.Sum256([]byte(password))
			expectedUsernameHash := sha256.Sum256([]byte(app.auth.username))
			expectedPasswordHash := sha256.Sum256([]byte(app.auth.password))

			usernameMatch := subtle.ConstantTimeCompare(usernameHash[:], expectedUsernameHash[:]) == 1
			passwordMatch := subtle.ConstantTimeCompare(passwordHash[:], expectedPasswordHash[:]) == 1

			if usernameMatch && passwordMatch {
				next.ServeHTTP(w, r)
				return
			}
		}

		w.Header().Set("WWW-Authenticate", `Basic realm="restricted", charset="UTF-8"`)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}
}
```

运行以上案例，您可以在浏览器访问网址：`https://localhost:4000/protected` ，您可以看到浏览器弹出的基本身份认证提示。

或者，您可以发送一些`curl`请求来验证`基本身份认证`是否正常工作

```shell
$ curl -i https://localhost:4000/unprotected
HTTP/2 200 
content-type: text/plain; charset=utf-8
content-length: 32
date: Sun, 20 Jun 2021 14:09:56 GMT

This is the unprotected handler

$ curl -i https://localhost:4000/protected
HTTP/2 401 
content-type: text/plain; charset=utf-8
www-authenticate: Basic realm="restricted", charset="UTF-8"
x-content-type-options: nosniff
content-length: 13
date: Sun, 20 Jun 2021 14:09:59 GMT

Unauthorized

$ curl -i -u alice:p8fnxeqj5a7zbrqp https://localhost:4000/protected
HTTP/2 200 
content-type: text/plain; charset=utf-8
content-length: 30
date: Sun, 20 Jun 2021 14:10:14 GMT

This is the protected handler

$ curl -i -u alice:wrongPa55word https://localhost:4000/protected
HTTP/2 401 
content-type: text/plain; charset=utf-8
www-authenticate: Basic realm="restricted", charset="UTF-8"
x-content-type-options: nosniff
content-length: 13
date: Sun, 20 Jun 2021 14:15:30 GMT

Unauthorized
```

## 向受保护的HTTP资源发出请求

当您需要访问受保护的资源时，Go可以让您变得非常简单。您需要做的是在执行请求之前调用[r.SetBasicAuth()](https://pkg.go.dev/net/http#Request.SetBasicAuth) 方法。如以下案例

```shell
package main

import (
    "fmt"
    "io"
    "log"
    "net/http"
    "time"
)

func main() {
    client := http.Client{Timeout: 5 * time.Second}

    req, err := http.NewRequest(http.MethodGet, "https://localhost:4000/protected", http.NoBody)
    if err != nil {
        log.Fatal(err)
    }

    req.SetBasicAuth("alice", "p8fnxeqj5a7zbrqp")

    res, err := client.Do(req)
    if err != nil {
        log.Fatal(err)
    }

    defer res.Body.Close()

    resBody, err := io.ReadAll(res.Body)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Status: %d\n", res.StatusCode)
    fmt.Printf("Body: %s\n", string(resBody))
}
```

## 参考文档

```shell
https://mhxw.life
https://www.alexedwards.net/blog/basic-authentication-in-go
```

