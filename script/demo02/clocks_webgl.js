var canvas;
var gl;
var squareVerticesBuffer;
var squareVerticesColorBuffer;
var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var vertexColorAttribute;
var perspectiveMatrix;

function start() {
	canvas = document.getElementById("visualization");

	var gl = new WebGl();
	if (gl.initialize(canvas)) {

	} else {
		// TODO Show error message.
	}
}

start();