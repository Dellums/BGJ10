#pragma strict
import UnityEngine.SceneManagement;

var theLevel : String;
 
function OnTriggerEnter (myTrigger : Collider) {
	if(myTrigger.gameObject.name == "Player"){
		SceneManager.LoadScene(theLevel);
	}
}