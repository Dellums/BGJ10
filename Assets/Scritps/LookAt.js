#pragma strict
var target : Transform; 

function Awake () {
	target = target.transform.Find("/Player");
}

function Update () {
	transform.LookAt(target);
}