/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "2018/11/07/linux/index.html",
    "revision": "eeb2b12c007e581195a022032cd1d5dd"
  },
  {
    "url": "2019/02/26/install-golang-on-ubuntu/index.html",
    "revision": "be676d0cd636acbd7ab5b5848a56b6a9"
  },
  {
    "url": "2021/02/20/build-and-push-a-container-image-to-docker-hub/index.html",
    "revision": "196d8b100e043af8b11718df696668d8"
  },
  {
    "url": "2021/02/27/install-discourse-on-ubuntu-18-04/index.html",
    "revision": "835fac49dfbd24ff63f0f334965fe12d"
  },
  {
    "url": "2021/03/06/install-bitwarden-on-ubuntu-18-04/index.html",
    "revision": "285c59a17cc8181552f3e0fc2b08311c"
  },
  {
    "url": "2021/04/10/java-generate-solidity/index.html",
    "revision": "9bdd44f37f71189e2472b0f8723c1bbe"
  },
  {
    "url": "2021/04/25/install-prometheus-on-linux/index.html",
    "revision": "840b1e0e3aefd9716ad379ccdf4120b2"
  },
  {
    "url": "2021/05/02/prometheus-alertmanager/index.html",
    "revision": "cb13e7bb5a2ab88e8cf33e716fc53213"
  },
  {
    "url": "2021/05/06/pushgateway/index.html",
    "revision": "26c65ac1dfcd04b91ae3718c69391e20"
  },
  {
    "url": "2021/05/09/instll-nginx-on-ubuntu/index.html",
    "revision": "d2e15003b4cf22c82e637f505390ed34"
  },
  {
    "url": "2021/05/16/install-docker-and-mysql-8-on-ubuntu/index.html",
    "revision": "e623e2758bde037db0fe4657dd83bf6d"
  },
  {
    "url": "2021/05/23/script-to-find-process-id-and-force-stop-process-under-linux/index.html",
    "revision": "0b05ae892ddf2327793cedd7f8d94760"
  },
  {
    "url": "2021/06/06/docker/index.html",
    "revision": "720ab511f31a127726f9b07ed5fbf6da"
  },
  {
    "url": "2021/06/13/install-docker-on-ubuntu-20-04/index.html",
    "revision": "9f6933bed62de22eaafe4bee788e13cc"
  },
  {
    "url": "2021/06/13/install-prometheus-grafana-alertmanager-by-docker/index.html",
    "revision": "5441b4b53b0999de6f600e603f6cd3a1"
  },
  {
    "url": "2021/06/20/cron/index.html",
    "revision": "aab52e0592bc9d9ec5b0526df27cb72a"
  },
  {
    "url": "2021/06/20/json-server/index.html",
    "revision": "96d11736e45fefc6fd076420ea86b941"
  },
  {
    "url": "2021/06/20/view-disk-space/index.html",
    "revision": "a6db61b0e5a496e3bd6d4df5230ab894"
  },
  {
    "url": "2021/06/27/upload-docker-images-to-aliyun/index.html",
    "revision": "338ff2d89bc07e990626ef6fe3e9bb32"
  },
  {
    "url": "2021/07/04/docker-install-nginx/index.html",
    "revision": "f5adf2f2cb460ec079a1ba6a38d0bb21"
  },
  {
    "url": "2021/07/11/coredns/index.html",
    "revision": "29d76441f05aeaba2c5c0c4d348c4e23"
  },
  {
    "url": "2021/07/15/basic-authentication-in-go/index.html",
    "revision": "a6744fb0b8284588a4c0947aee7d2bcc"
  },
  {
    "url": "404.html",
    "revision": "76b988b8905f11c3766e11b7f7b841aa"
  },
  {
    "url": "about.html",
    "revision": "50e0a63f415f7dc7f530c89601869512"
  },
  {
    "url": "assets/css/0.styles.15d6f971.css",
    "revision": "3761eb398653c9dcbeb2b31e9e4e86ca"
  },
  {
    "url": "assets/img/baig-1.d9959a7a.jpg",
    "revision": "d9959a7a8ed6707f802eba653af11a83"
  },
  {
    "url": "assets/img/pt-1.286b3d88.png",
    "revision": "286b3d88e1c03fba79dd3139950998ad"
  },
  {
    "url": "assets/img/pt-10.0a745aad.png",
    "revision": "0a745aad61c3d1ac4d50c91eed4b8f80"
  },
  {
    "url": "assets/img/pt-11.56100dcb.png",
    "revision": "56100dcb238cc76cf7f6a2f781568d00"
  },
  {
    "url": "assets/img/pt-12.9317819a.png",
    "revision": "9317819a6018b85f83fcb1e4083d2c50"
  },
  {
    "url": "assets/img/pt-13.f5c01ac0.png",
    "revision": "f5c01ac0c6182012d72d0de9908c75c4"
  },
  {
    "url": "assets/img/pt-14.175ebfca.png",
    "revision": "175ebfca9de17129d83e0236df3702dd"
  },
  {
    "url": "assets/img/pt-15.a555f842.png",
    "revision": "a555f842ddbb867a93a4cd843c3eeb28"
  },
  {
    "url": "assets/img/pt-16.26053b7b.png",
    "revision": "26053b7b8928e905cea79f9d0fbc5eff"
  },
  {
    "url": "assets/img/pt-2.f6022b51.png",
    "revision": "f6022b51a3298489c7773889c3e57ee9"
  },
  {
    "url": "assets/img/pt-3.f6022b51.png",
    "revision": "f6022b51a3298489c7773889c3e57ee9"
  },
  {
    "url": "assets/img/pt-4.30a4ae70.png",
    "revision": "30a4ae700a0b04aa4d24dd157d95dd84"
  },
  {
    "url": "assets/img/pt-5.81acfb25.png",
    "revision": "81acfb25e245ce5f0d24ac5d16f8d985"
  },
  {
    "url": "assets/img/pt-6.48cdb646.png",
    "revision": "48cdb6469babcd1b233baca825a466aa"
  },
  {
    "url": "assets/img/pt-7.ffaca6ad.png",
    "revision": "ffaca6adbc4c0237abd6dc01b2c833c1"
  },
  {
    "url": "assets/img/pt-8.27ddb96d.png",
    "revision": "27ddb96dc188c54701010e97fcfeec2b"
  },
  {
    "url": "assets/img/pt-9.870045b3.png",
    "revision": "870045b34278dd5fb2bf303fe0e2d492"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/udta-1.afd1fe54.png",
    "revision": "afd1fe5470d76fa5cbe3bf0492398d11"
  },
  {
    "url": "assets/img/udta-2.8a8255c9.png",
    "revision": "8a8255c94b37a73c79a6bcc186828e1c"
  },
  {
    "url": "assets/img/udta-3.c12758ed.png",
    "revision": "c12758ed8eeeccead62e40fb2c30f91e"
  },
  {
    "url": "assets/img/udta-4.ea69c436.png",
    "revision": "ea69c436f0f9e7612fa17029428729fb"
  },
  {
    "url": "assets/js/10.6929b2b7.js",
    "revision": "2e86457eab1244153d763b051b6ba717"
  },
  {
    "url": "assets/js/11.103ea2f0.js",
    "revision": "03ce807993d6dc52fc24fe60742f8e54"
  },
  {
    "url": "assets/js/12.4d636b7f.js",
    "revision": "06361bf9b599ef0a1c0909c145ceb0c0"
  },
  {
    "url": "assets/js/13.d93a6436.js",
    "revision": "a68ea358a71b7a099478bfe0b2aa278b"
  },
  {
    "url": "assets/js/14.521720fc.js",
    "revision": "dca2b260f51e85396b561153b1fd141c"
  },
  {
    "url": "assets/js/15.fe7581b1.js",
    "revision": "a2330bdece4b6f96227befb13c0b39df"
  },
  {
    "url": "assets/js/16.fd0d2525.js",
    "revision": "7310c4eb4a247659347e34463b86c57b"
  },
  {
    "url": "assets/js/17.bd669e5d.js",
    "revision": "7a50a0ba4a313242ead3f0de459de411"
  },
  {
    "url": "assets/js/18.49681434.js",
    "revision": "7f5a6d6c8f33d60959661ad09512b5d5"
  },
  {
    "url": "assets/js/19.dff2ad59.js",
    "revision": "95e47236336640686a643130ddf16126"
  },
  {
    "url": "assets/js/20.97e79743.js",
    "revision": "0447b5a629b8dae4aaa1cb734cfdf5a9"
  },
  {
    "url": "assets/js/21.c93097bc.js",
    "revision": "42f0b120395e3deaf284127d28468f6c"
  },
  {
    "url": "assets/js/22.429da250.js",
    "revision": "d7bf693aeedb65e24d93a63e41dc8699"
  },
  {
    "url": "assets/js/23.730f8451.js",
    "revision": "ca1943a20baf135e89093a3f7c3e3e00"
  },
  {
    "url": "assets/js/24.6eed2fc2.js",
    "revision": "2fc90f1e2837abaa334e6af397ea0cb3"
  },
  {
    "url": "assets/js/25.6ccaca11.js",
    "revision": "00d3143bb0ae091c6aa0b9f608fb1982"
  },
  {
    "url": "assets/js/26.a22dd40f.js",
    "revision": "f533f51baf324cfb89c66c4bebbaab8d"
  },
  {
    "url": "assets/js/27.78579ce9.js",
    "revision": "526e28f4870f9758e51db95cf5248e35"
  },
  {
    "url": "assets/js/28.b4036104.js",
    "revision": "17bdefb5486bd04dd2b98b8c4f8619ce"
  },
  {
    "url": "assets/js/29.4aa3c2c4.js",
    "revision": "e0e328a53a0153f33165e7994a7489b5"
  },
  {
    "url": "assets/js/3.f6739d14.js",
    "revision": "8db56f3802b46c49c611be6a2337d76c"
  },
  {
    "url": "assets/js/30.3a3b493c.js",
    "revision": "c82d9f52066d571e76515e121ca58c4d"
  },
  {
    "url": "assets/js/31.57fab91c.js",
    "revision": "390c949ba0ca6148e31164008178f738"
  },
  {
    "url": "assets/js/32.47a51bf2.js",
    "revision": "a3cecf4965f45e3f30963280a15ec79d"
  },
  {
    "url": "assets/js/33.13e1708f.js",
    "revision": "c326d99c9a40491c653672729473379d"
  },
  {
    "url": "assets/js/34.2b92be19.js",
    "revision": "637e088e0bc860184aa655ce34c18b4d"
  },
  {
    "url": "assets/js/35.3536a88d.js",
    "revision": "73b844114b5fd57b6883cbab7d1c45ec"
  },
  {
    "url": "assets/js/36.1c3e47e9.js",
    "revision": "47d8c967a6376627d3c2a9277ffcd14b"
  },
  {
    "url": "assets/js/4.638b10e5.js",
    "revision": "7b4bfc5c43989219f9fbf12d9a50eb3e"
  },
  {
    "url": "assets/js/5.e5967abf.js",
    "revision": "1bb945a07375110ccc6cb7f1b1452c8a"
  },
  {
    "url": "assets/js/6.c4877f48.js",
    "revision": "735b60aff69a4a263b00f8532f1c951f"
  },
  {
    "url": "assets/js/7.e800e18b.js",
    "revision": "ec2c699b8b8858292b98dcd32d0ebe81"
  },
  {
    "url": "assets/js/8.2b515bb1.js",
    "revision": "63406c23d659553ebf0c909e0de0eae0"
  },
  {
    "url": "assets/js/9.632d5cc1.js",
    "revision": "79bafa7b897ac5c4b53bbdacca65775e"
  },
  {
    "url": "assets/js/app.36252550.js",
    "revision": "5ab66c3a54ac2148aad8df2d971fac30"
  },
  {
    "url": "assets/js/vuejs-paginate.92caeb0c.js",
    "revision": "167d63bab54c99621b4c4252d0f0f786"
  },
  {
    "url": "index.html",
    "revision": "16a5d428bc5c46a783724ce8d70e3b68"
  },
  {
    "url": "location/Hangzhou/index.html",
    "revision": "d4236488599599b95f252e2d8f0c59b3"
  },
  {
    "url": "location/index.html",
    "revision": "4d61b570e40e1a01ec0281b6ee6cef4f"
  },
  {
    "url": "logo.png",
    "revision": "e5e54acc4b4c873ba6528759bf90a53b"
  },
  {
    "url": "page/2/index.html",
    "revision": "4c0d7e42b95f1989a6105b165381adcd"
  },
  {
    "url": "page/3/index.html",
    "revision": "dad42c22efced49b955c87c7f633d56c"
  },
  {
    "url": "tag/alertmanager/index.html",
    "revision": "c49842999f20337870d377397fa5dcbd"
  },
  {
    "url": "tag/basic-auth/index.html",
    "revision": "0c74b3ca24a22b3876d8e136ee480e6a"
  },
  {
    "url": "tag/coredns/index.html",
    "revision": "9675b463e05f5b178167e863ec6b6440"
  },
  {
    "url": "tag/crontab/index.html",
    "revision": "e162bf04604d7444d06a13c1d59d1e55"
  },
  {
    "url": "tag/discourse/index.html",
    "revision": "57ff1eaebf320591a191dbe1f752c5bb"
  },
  {
    "url": "tag/dns/index.html",
    "revision": "ca4d20f526a12341432c2963592bfd82"
  },
  {
    "url": "tag/docker/index.html",
    "revision": "5b0c8e944faef3c56911fc97affe1f18"
  },
  {
    "url": "tag/golang/index.html",
    "revision": "13a1496e2ef8f4aa923d924a0ae7d8e2"
  },
  {
    "url": "tag/grafana/index.html",
    "revision": "edb1a5410b727740ce9ea53d970ebacb"
  },
  {
    "url": "tag/index.html",
    "revision": "b59fa5b33f31cbfd925a1a0661c25906"
  },
  {
    "url": "tag/json-server/index.html",
    "revision": "26aeb4355c223f9399beb5bdaf00cbd1"
  },
  {
    "url": "tag/linux/index.html",
    "revision": "75c9d60f01bfbcdcbe36222740b6cfcd"
  },
  {
    "url": "tag/markdown/index.html",
    "revision": "a313735256aefc3a16024be208fb49af"
  },
  {
    "url": "tag/mysql/index.html",
    "revision": "bc2abc7a24da41f66c746e06924a7d8d"
  },
  {
    "url": "tag/nginx/index.html",
    "revision": "0b7fe0baed07352d1435278dfad2a44d"
  },
  {
    "url": "tag/prometheus/index.html",
    "revision": "46272ba7844b58ca0221b31119696ab9"
  },
  {
    "url": "tag/pushgateway/index.html",
    "revision": "6d3e203d0e04670465fc71dee1788fcf"
  },
  {
    "url": "tag/shell/index.html",
    "revision": "9fd2d8d5c009fcdb050739fbc8a74ae4"
  },
  {
    "url": "tag/solidity/index.html",
    "revision": "7ed3ca0577cfb5222a9d71285d26d761"
  },
  {
    "url": "tag/tutorial/index.html",
    "revision": "41a9617479de944984940d6cb7b90b62"
  },
  {
    "url": "tag/ubuntu/index.html",
    "revision": "22358da5433f9e70b69a6e144bdf2e63"
  },
  {
    "url": "tag/vuepress/index.html",
    "revision": "8f0d90341692eab808562882d707758b"
  },
  {
    "url": "tag/web3j/index.html",
    "revision": "47e68798a3bb9ea95026730c3e009aa9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
