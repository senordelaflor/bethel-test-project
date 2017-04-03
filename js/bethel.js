function calcVH() {
    var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    document.getElementById("hero").setAttribute("style", "height:" + vH + "px;");
}
calcVH();
window.addEventListener('onorientationchange', calcVH, true);
window.addEventListener('resize', calcVH, true);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpeF9iZ19pbWdfYW5kcm9pZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJiZXRoZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjYWxjVkgoKSB7XG4gICAgdmFyIHZIID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb1wiKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImhlaWdodDpcIiArIHZIICsgXCJweDtcIik7XG59XG5jYWxjVkgoKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbm9yaWVudGF0aW9uY2hhbmdlJywgY2FsY1ZILCB0cnVlKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjYWxjVkgsIHRydWUpOyJdfQ==
