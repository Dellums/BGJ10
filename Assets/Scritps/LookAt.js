#pragma strict
var target : Transform; 

function Awake () {
	target = target.transform.Find("/Player");
}

function Update () {
	if(Mathf.Abs(target.transform.position.z - transform.position.z) > .5){
		transform.LookAt(target);
	}
}