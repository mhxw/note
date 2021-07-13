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
    "revision": "67461a1a65e9ccb7d31b018065bf8d11"
  },
  {
    "url": "2019/02/26/install-golang-on-ubuntu/index.html",
    "revision": "74ee6df0cd380eb386f047f6a63b94ec"
  },
  {
    "url": "2021/02/20/build-and-push-a-container-image-to-docker-hub/index.html",
    "revision": "4dd535fbe69d261ea794b25850c6d91c"
  },
  {
    "url": "2021/02/27/install-discourse-on-ubuntu-18-04/index.html",
    "revision": "e33f5d102fcb9e6abfe46780dbbfa198"
  },
  {
    "url": "2021/03/06/install-bitwarden-on-ubuntu-18-04/index.html",
    "revision": "e5ad451f46c5e10c1a68f6c6f534481c"
  },
  {
    "url": "2021/04/10/java-generate-solidity/index.html",
    "revision": "fdbb1221f0f4cef90e2c3940922f51aa"
  },
  {
    "url": "2021/04/25/install-prometheus-on-linux/index.html",
    "revision": "64ede281fff283fe200ad92363625bd0"
  },
  {
    "url": "2021/05/02/prometheus-alertmanager/index.html",
    "revision": "16b3ed0ac5473140c12f59711b93b9f9"
  },
  {
    "url": "2021/05/06/pushgateway/index.html",
    "revision": "164303cd12664f3be201da32b62f7f50"
  },
  {
    "url": "2021/05/09/instll-nginx-on-ubuntu/index.html",
    "revision": "4f290097653ab185fec29523a38880cc"
  },
  {
    "url": "2021/05/16/install-docker-and-mysql-8-on-ubuntu/index.html",
    "revision": "299d0bf76281e1803d80c32f81d0134a"
  },
  {
    "url": "2021/05/23/script-to-find-process-id-and-force-stop-process-under-linux/index.html",
    "revision": "86085210849afece4f293bc5cc388e0f"
  },
  {
    "url": "2021/06/06/docker/index.html",
    "revision": "514b208a480c8943956dd30ccd2ac734"
  },
  {
    "url": "2021/06/13/install-docker-on-ubuntu-20-04/index.html",
    "revision": "1c44b345302bf46e14710d5c79a7c083"
  },
  {
    "url": "2021/06/13/install-prometheus-grafana-alertmanager-by-docker/index.html",
    "revision": "d46afed9007920cdf910cb4a43308258"
  },
  {
    "url": "2021/06/20/cron/index.html",
    "revision": "c278742d7cd8cd7021f6a764adca27cb"
  },
  {
    "url": "2021/06/20/json-server/index.html",
    "revision": "06e12345a6250af0cb6c13ec09c823a6"
  },
  {
    "url": "404.html",
    "revision": "132b2eee8340498bdab3a1951e7a3f4a"
  },
  {
    "url": "about.html",
    "revision": "f72a2548c8572aba060e5a6c464f918b"
  },
  {
    "url": "assets/css/0.styles.15d6f971.css",
    "revision": "3761eb398653c9dcbeb2b31e9e4e86ca"
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
    "url": "assets/js/10.fa35a441.js",
    "revision": "73a1d6b90ededa5b30a95004d4a8b02c"
  },
  {
    "url": "assets/js/11.84034b17.js",
    "revision": "85aa4eea0581e3d38ad4cdec586081eb"
  },
  {
    "url": "assets/js/12.4dcf373a.js",
    "revision": "b2e3bb16534f584122291d703976b5d1"
  },
  {
    "url": "assets/js/13.49c85706.js",
    "revision": "727c13e60bc3cadac3b1babd633de434"
  },
  {
    "url": "assets/js/14.5d9bc457.js",
    "revision": "f800b9b3bd4a3cb1e016c430b24589dd"
  },
  {
    "url": "assets/js/15.de66ca76.js",
    "revision": "93183ad04c3deb54fb61f5468707a5a3"
  },
  {
    "url": "assets/js/16.8126ff65.js",
    "revision": "aad10f2e1df77e07006f4c57673f8086"
  },
  {
    "url": "assets/js/17.e7924daa.js",
    "revision": "5e0aee712d68c4bc89e6547ba0e1bbc1"
  },
  {
    "url": "assets/js/18.50f806dc.js",
    "revision": "ac9487f3554ad4b14417b276e772ab60"
  },
  {
    "url": "assets/js/19.b38354a8.js",
    "revision": "240ef32dfcb63c76be3c23b8c3188c8e"
  },
  {
    "url": "assets/js/20.23fc2abd.js",
    "revision": "ea0758e8f12368a084dc7bac3f2f0d1c"
  },
  {
    "url": "assets/js/21.911ae66e.js",
    "revision": "c99b8f97883841f744402e3d15871652"
  },
  {
    "url": "assets/js/22.494e5b5a.js",
    "revision": "bb151e9420bc6470c5684e1f73008479"
  },
  {
    "url": "assets/js/23.06eb36b5.js",
    "revision": "4bbf2e8800dc18f9f90d79c34819022f"
  },
  {
    "url": "assets/js/24.aaec931d.js",
    "revision": "039fb51a99f7d9f7c0ef19e946882e84"
  },
  {
    "url": "assets/js/25.70fd365d.js",
    "revision": "b055ffdaf39a533bff7e9f75671a5fb5"
  },
  {
    "url": "assets/js/26.81711889.js",
    "revision": "a5af1ae754f348da84a2f4c0f7dafa21"
  },
  {
    "url": "assets/js/27.a0eae08f.js",
    "revision": "3c72b08ecae2304ff2ad446a52724774"
  },
  {
    "url": "assets/js/28.775de099.js",
    "revision": "fb24423e58b72ed850c44fef682d5eec"
  },
  {
    "url": "assets/js/29.f3b43e17.js",
    "revision": "7a89324aecffba71847f95101c27705c"
  },
  {
    "url": "assets/js/3.9d25c525.js",
    "revision": "9c3830873f889c37cb87d08a8a687253"
  },
  {
    "url": "assets/js/30.39ef908e.js",
    "revision": "db3be6f1b29963557cbf1ed8fb4fb14c"
  },
  {
    "url": "assets/js/31.f85275f2.js",
    "revision": "6ddef9ff6f98e306a3e28c7ea182a2ff"
  },
  {
    "url": "assets/js/4.026d26ab.js",
    "revision": "ed0fb7ade2b7c317bd5af282e6be37f0"
  },
  {
    "url": "assets/js/5.65d0a346.js",
    "revision": "2e95c78fc6cf75041de8a7265fa7cb50"
  },
  {
    "url": "assets/js/6.dd19f455.js",
    "revision": "87bc616571986657696ca2d2ac703ce3"
  },
  {
    "url": "assets/js/7.52469337.js",
    "revision": "104a38167202b6cb317ba9322db7c464"
  },
  {
    "url": "assets/js/8.dd662062.js",
    "revision": "44c46924636a25b980c595b0f7a37e89"
  },
  {
    "url": "assets/js/9.3353dfab.js",
    "revision": "f0f35077242f856fe08020e6506bcb1f"
  },
  {
    "url": "assets/js/app.053bf253.js",
    "revision": "a30c346384caa17b9494e2038e5b8c2a"
  },
  {
    "url": "assets/js/vuejs-paginate.c187ee8e.js",
    "revision": "c52334c3c208fcba9d54a7001efe56bd"
  },
  {
    "url": "index.html",
    "revision": "a7e6890df1221f75bdea7f4836b3a102"
  },
  {
    "url": "location/Hangzhou/index.html",
    "revision": "f40a4e949a0b646dc2552cff83286fc4"
  },
  {
    "url": "location/index.html",
    "revision": "3a91387f402b827204d5dc24d9e376ba"
  },
  {
    "url": "logo.png",
    "revision": "e5e54acc4b4c873ba6528759bf90a53b"
  },
  {
    "url": "page/2/index.html",
    "revision": "0e8bcc83d9e813554782d64c6b467ea1"
  },
  {
    "url": "tag/alertmanager/index.html",
    "revision": "a8f4f672dc04af8beeb08a77eabb7fe8"
  },
  {
    "url": "tag/discourse/index.html",
    "revision": "e2e4902996a97521bb6b2ad171a44bd4"
  },
  {
    "url": "tag/docker/index.html",
    "revision": "723196ec6903699ba9e8987300c44b0a"
  },
  {
    "url": "tag/golang/index.html",
    "revision": "00ae4eacd5a7c3c88414971ef393e1d2"
  },
  {
    "url": "tag/grafana/index.html",
    "revision": "e190d2662bfe88ff7f329ac1ef0cb185"
  },
  {
    "url": "tag/index.html",
    "revision": "48f47c2c19444d990f6e1e7c0dec499e"
  },
  {
    "url": "tag/json-server/index.html",
    "revision": "edb9d8b8a6f5a8de3c65e67929de58b1"
  },
  {
    "url": "tag/linux/index.html",
    "revision": "4451be015653ceea9e4be88d15a738da"
  },
  {
    "url": "tag/markdown/index.html",
    "revision": "590e832f4849c6b62da740c10f1c2a05"
  },
  {
    "url": "tag/mysql/index.html",
    "revision": "18314268a2e77c3aa13059566a7579ad"
  },
  {
    "url": "tag/nginx/index.html",
    "revision": "40c52fce66da0ae839461a056586fe65"
  },
  {
    "url": "tag/prometheus/index.html",
    "revision": "41c91cbef088328baf6d75064fcf5985"
  },
  {
    "url": "tag/pushgateway/index.html",
    "revision": "5c2f23a66689c64e6eb4012bc8a53110"
  },
  {
    "url": "tag/shell/index.html",
    "revision": "d5b6e5c013e64c946a8c1cc69b5e300b"
  },
  {
    "url": "tag/solidity/index.html",
    "revision": "b65a75d4c26e99c9dabb10b248a58be2"
  },
  {
    "url": "tag/ubuntu/index.html",
    "revision": "8c81e29b9c2a59759b18804e8e5aa9a1"
  },
  {
    "url": "tag/vuepress/index.html",
    "revision": "e492c1750e3ab9dfd2ce778b19199b43"
  },
  {
    "url": "tag/web3j/index.html",
    "revision": "2c468bd31bc37e63e0300a4cafcb9107"
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
