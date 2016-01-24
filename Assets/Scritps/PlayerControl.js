#pragma strict
@script RequireComponent(CharacterController);
var PlayerCam 		:Camera;

var speed 			: float = 6.0;
var backSpeed 		: float = 3.0;
var jumpSpeed 		: float = 8.0;
var rotateSpeed 	: float = 3.0;
var gravity 		: float = 20.0;
var sprintModifier	: float = 5.0;

var m_Animator 		: Animator;

private var moveDirection : Vector3 = Vector3.zero;

//Renderer stuff
var PlayerSkins:Material[];

var MimeHat:GameObject;
var MimeShirt:GameObject;
var MimePants:GameObject;
var MimeBands:GameObject;
var MimeStocking:GameObject;
var MimeShoes:GameObject;

var DinoPants:GameObject;
var DinoShirt:GameObject;

var MedShirt:GameObject;
var MedUnderpants:GameObject;
var MedGloves:GameObject;
var MedBoots:GameObject;
var MedArmorPant:GameObject;

var HubPants:GameObject;
var HubShirt:GameObject;

var PlayerModel:GameObject;

var Hub : boolean;
var Dino : boolean;
var Medieval : boolean;
var Mime : boolean;


function Update () {
	if (Hub){
		HubPlayerControl();
	}
	if (Dino){
		DinoPlayerControl();
	}
	if (Medieval){
		MedPlayerControl();
	}
	if (Mime){
		MimePlayerControl();
	}

	PlayerMoveScript();
}




//Player movement script.

function PlayerMoveScript(){

	var controller :CharacterController = GetComponent(CharacterController);

	//Rotate
	transform.Rotate(0, Input.GetAxisRaw("Horizontal")*rotateSpeed,0);
	//Strafe
	// moveDirection = Vector3(Input.GetAxisRaw("Horizontal"), 0, Input.GetAxisRaw("Vertical"));
	if(controller.isGrounded){
		moveDirection = Vector3(0, 0, Input.GetAxisRaw("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		if(Input.GetAxisRaw("Vertical")<0){
			moveDirection *= speed - backSpeed;
		}
		else{
			if(Input.GetButton("Fire3")){
				m_Animator.SetBool("Sprinting", true);
				moveDirection *= (speed+sprintModifier);
			}
			else{
				m_Animator.SetBool("Sprinting", false);
				moveDirection *= speed;
			}
		}
		if(Input.GetButton("Jump")){
			moveDirection.y = jumpSpeed;
		}
	}
	//Apply Gravity
	moveDirection.y -= gravity;
	controller.Move(moveDirection * Time.deltaTime/Time.timeScale);

	//Animations
	m_Animator.SetFloat("Back", Input.GetAxisRaw("Vertical"));
}




//Player renderer for different outfits.

function MimePlayerControl(){
	ClearRenderer();
	PlayerModel.GetComponent.<Renderer>().sharedMaterial = PlayerSkins[1]; 
	MimeHat.GetComponent.<Renderer>().enabled = true;
	MimeStocking.GetComponent.<Renderer>().enabled = true;
	MimeShirt.GetComponent.<Renderer>().enabled = true;
	MimePants.GetComponent.<Renderer>().enabled = true;
	MimeBands.GetComponent.<Renderer>().enabled = true;
	MimeShirt.GetComponent.<Renderer>().enabled = true;
	MimeShoes.GetComponent.<Renderer>().enabled = true;
	Hub = false;
	Dino = false;
	Medieval = false;
	Mime = false;
}

function HubPlayerControl(){
	ClearRenderer();
	HubShirt.GetComponent.<Renderer>().enabled = true;
	HubPants.GetComponent.<Renderer>().enabled = true;
	MimeShoes.GetComponent.<Renderer>().enabled = true;
	Mime = false;
	Dino = false;
	Medieval = false;
	Hub = false;
}

function DinoPlayerControl(){
	ClearRenderer();
	DinoShirt.GetComponent.<Renderer>().enabled = true;
	DinoPants.GetComponent.<Renderer>().enabled = true;
	Mime = false;
	Hub = false;
	Medieval = false;
	Dino = false;
}

function MedPlayerControl(){
	ClearRenderer();
	MedBoots.GetComponent.<Renderer>().enabled = true;
	MedGloves.GetComponent.<Renderer>().enabled = true;
	MedUnderpants.GetComponent.<Renderer>().enabled = true;
	MedShirt.GetComponent.<Renderer>().enabled = true;
	MedArmorPant.GetComponent.<Renderer>().enabled = true;
	Mime = false;
	Hub = false;
	Dino = false;
	Medieval = false;
}

function ClearRenderer(){
	PlayerModel.GetComponent.<Renderer>().sharedMaterial = PlayerSkins[0];
	HubShirt.GetComponent.<Renderer>().enabled = false;
	HubPants.GetComponent.<Renderer>().enabled = false;
	DinoShirt.GetComponent.<Renderer>().enabled = false;
	DinoPants.GetComponent.<Renderer>().enabled = false;
	MimeHat.GetComponent.<Renderer>().enabled = false;
	MimeStocking.GetComponent.<Renderer>().enabled = false;
	MimeShirt.GetComponent.<Renderer>().enabled = false;
	MimePants.GetComponent.<Renderer>().enabled = false;
	MimeBands.GetComponent.<Renderer>().enabled = false;
	MimeShoes.GetComponent.<Renderer>().enabled = false;
	MedBoots.GetComponent.<Renderer>().enabled = false;
	MedGloves.GetComponent.<Renderer>().enabled = false;
	MedUnderpants.GetComponent.<Renderer>().enabled = false;
	MedShirt.GetComponent.<Renderer>().enabled = false;
	MedArmorPant.GetComponent.<Renderer>().enabled = false;
}