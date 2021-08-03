(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{449:function(s,a,t){"use strict";t.r(a);var e=t(11),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"设置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置"}},[s._v("#")]),s._v(" 设置")]),s._v(" "),t("h3",{attrs:{id:"_1-从-官网-载coredns"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-从-官网-载coredns"}},[s._v("#")]),s._v(" 1. 从 "),t("a",{attrs:{href:"https://coredns.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官网"),t("OutboundLink")],1),s._v(" 载CoreDNS")]),s._v(" "),t("p",[s._v("将二进制文件解压到 "),t("code",[s._v("/mhxw/dns")]),s._v("并使其可执行")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x /mhxw/dns/coredns\n")])])]),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("docker pull coredns/coredns\n")])])]),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p /mhxw/coredns\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("nano")]),s._v(" /mhxw/coredns/dns/coredns/corefile\n")])])]),t("h3",{attrs:{id:"配置方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置方式"}},[s._v("#")]),s._v(" 配置方式")]),s._v(" "),t("ul",[t("li",[s._v("内部hosts")])]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v(".:53 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    hosts "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.0")]),s._v(".0.1 my.host.com\n        fallthrough\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    forward "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("114.114")]),s._v(".114.114:53\n    log\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("ul",[t("li",[s._v("外部hosts")])]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v(".:53 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    hosts /etc/coredns/hostsfile "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        fallthrough\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    forward "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.8")]),s._v(".8.8:53\n    log\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cat hostsfile")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.0")]),s._v(".0.1 my.host.com\n")])])]),t("h3",{attrs:{id:"启动服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动服务"}},[s._v("#")]),s._v(" 启动服务")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("docker run -it -d --name coredns "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n--net"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("host "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-v /mhxw/dns/coredns:/etc/coredns/ "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\ncoredns/coredns:latest "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-conf /etc/coredns/corefile\n")])])]),t("h3",{attrs:{id:"测试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#测试"}},[s._v("#")]),s._v(" 测试")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("dig")]),s._v(" @127.0.0.1 -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("53")]),s._v(" my.host.com\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);