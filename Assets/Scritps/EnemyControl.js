var hitcount 		: int = 0;
var m_Animator 		: Animator;
var speed 			: float = 3.0;
var line 			: LineRenderer; //to hold the line Renderer
var target 			: Transform; //to hold the transform of the target
var agent 			: NavMeshAgent; //to hold the agent of this gameObject
var LineDebug		: boolean = false;
function Start(){
    line = GetComponent(LineRenderer); //get the line renderer
    agent = GetComponent(NavMeshAgent); //get the agent
    getPath();
}
function LateUpdate(){
	getPath();
	if(hitcount >= 10){
		m_Animator.SetBool("Death", true);
		hitcount = 0;
		GetComponent.<Collider>().enabled = false;
		agent.Stop();
	}
}

function getPath(){
    line.SetPosition(0, transform.position); //set the line's origin

    agent.SetDestination(target.position); //create the path
    agent.speed = speed;
    yield WaitForEndOfFrame(); //wait for the path to generate
    DrawPath(agent.path);
    if(LineDebug){
    	line.enabled = true;
    }
    else{
    	line.enabled = false;
    }
}

function DrawPath(path : NavMeshPath){
    if(path.corners.Length < 2) //if the path has 1 or no corners, there is no need
        return;

    line.SetVertexCount(path.corners.Length); //set the array of positions to the amount of corners

    for(var i = 1; i < path.corners.Length; i++){
        line.SetPosition(i, path.corners[i]); //go through each corner and set that to the line renderer's position
    }
}

function OnTriggerExit (myTrigger : Collider) {
	if(myTrigger.gameObject.tag == "PlayerWeapon"){
		hitcount = hitcount +1;
		print("Hit: " + hitcount + " times!");
	}
}

// function OnColliderExit (myTrigger : Collision) {
// 	if(myTrigger.gameObject.tag == "PlayerWeapon"){
// 		hitcount = hitcount +1;
// 		print("Hit: " + hitcount + " times!");
// 	}
// }
