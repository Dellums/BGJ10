#pragma strict

var theLevel : String;
 
function OnTriggerEnter (myTrigger : Collider) {
	if(myTrigger.gameObject.name == "Player"){
		Application.LoadLevel(theLevel);
	}
}