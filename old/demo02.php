<script id="shader-fs" type="x-shader/x-fragment">
		varying lowp vec4 vColor;
		
	  void main(void) {
		gl_FragColor = vColor;
	  }
	</script>

<script id="shader-vs" type="x-shader/x-vertex">
	attribute vec3 aVertexPosition;
	attribute vec4 aVertexColor;
	
	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	  
	varying lowp vec4 vColor;
	
	void main(void) {
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
		vColor = aVertexColor;
	}
	</script>

<canvas id="visualization" width="960" height="400"></canvas>
<div id="code" data-code-url="/script/demo02/clocks_webgl.js"></div>

<script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.js"></script>
<script src="script/core/demo.js"></script>
<script src="script/external/sylvester.js"></script>
<script src="script/demo02/webgl.js"></script>
<script src="script/demo02/clocks_webgl.js"></script>
<script src="script/external/cm-javascript.js"></script>
<link rel="stylesheet" href="style/demo02/clocks.css">
<link rel="stylesheet" href="style/mycodemirror.css">