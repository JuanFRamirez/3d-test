// variables
let container;
let camera;
let renderer;
let scene;
let skull;

const cta =  document.querySelector('.cta');
const cta2 = document.querySelector('.cta2');

function init(){
    container = document.querySelector('.scene');

    //create scene 
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    camera.position.set(-1.0,-0.5,3.5);

    const ambient = new THREE.AmbientLight(0x404040,9);

    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(5,10,5);

    scene.add(light);

    //renderer

    renderer  = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    //load model

    let loader =  new THREE.GLTFLoader();

    loader.load('./3d/scene.gltf',(gltf)=>{
        scene.add(gltf.scene);
        skull = gltf.scene.children[0]; 
        skull.rotation.z = -111.6;

            animate()
            onResize();
            clickHandler();      
            clickHandler2();    
      
    })

    const tl = gsap.timeline({
        delay:1.5
    });
    tl.to('.main-container',{x:'0',opacity:'1'})
    .to('.main-container h1',{y:'0',opacity:1},'+0.5')
    .to('.main-container p',{y:'0',opacity:1})
    .to('.main-container .cta',{y:'0',opacity:1})
}

init();

let startAnim = false; //initial animation state
let req; //request animation handler
let req2; //request animation2
let req3; //request animation3

function animate(){
   
    startAnim = true;
    
    if(startAnim)
    { 
        req = requestAnimationFrame(animate);    
    
    const tl2 = gsap.timeline({
        duration:1,
        repeat:0
    });
    tl2.to(skull.rotation,{z:'-110.25'},'-=0.6')
    .to(camera.position,{z:'2.3'},'-=0.5')
    .to(camera.position,{x:'-1.0'},'-=0.5')
    .to(camera.position,{y:'-1.01'},'-=0.5')
    .eventCallback('onComplete',()=>{
        tl2.kill()
    })
    renderer.render(scene,camera); 
    }

    setTimeout(()=>{
        cancelAnimationFrame(req);
    },3000)
    return
    
}


function onResize(){
    window.addEventListener('resize',()=>{
        renderer.setSize(container.clientWidth,container.clientHeight);
        camera.updateProjectionMatrix()
        renderer.render(scene,camera);
    })
}

function clickHandler(){
    let running = false;
    cta.addEventListener('click',function animate(){   
        req2=requestAnimationFrame(animate) 
        
            tl3 = gsap.timeline({
                duration:1,
                repeat:0
            });
            tl3.to('.main-container',{x:'-100%'})
            .to('.main-container2',{x:'0',opacity:'1'},'-=0.5')
            .to('.main-container2 h1',{y:'0',opacity:1},'-=0.5')
            .to('.main-container2 p',{y:'0',opacity:1},'-=0.5')
            .to('.main-container2 .cta2',{y:'0',opacity:1},'-=0.5')
            .to(skull.position,{x:'-0.08',y:'-=0.070',z:'-=0.05'},'-=0.5')
            .to(camera.rotation,{x:'0',y:'0.001',z:'0'},'-=0.5')
            .to(scene.rotation,{y:'-1'},'-=0.5')
            .to('.main-container',{opacity:'0'})
            .eventCallback('onComplete',()=>{
                tl3.kill();
                
            })
            renderer.render(scene,camera);
            
            setTimeout(()=>{
                cancelAnimationFrame(req2)
            },4000)
       
            
        
        
    });
}


function clickHandler2(){
    let running = false;
    cta2.addEventListener('click',function animate(){   
        req3=requestAnimationFrame(animate) 
        
            tl3 = gsap.timeline({
                duration:0.3,
                repeat:0
            });
            tl3.to('.main-container2',{x:'-120%'},'-=0.5')
            .to(skull.rotation,{z:'+=0.079'},'+=1')
            .to(skull.position,{x:'0.05',y:'-0.08',z:'-2.1'},'-=0.5')
            .to(camera.rotation,{x:'0.100',y:'-0.005',z:'0.05'},'-=0.5')
            .to(scene.rotation,{x:'0.1',y:'0.5',z:'0.08'},'-=0.5')
            .to('.main-container2',{opacity:'0'})
            .eventCallback('onComplete',()=>{
                tl3.kill();
                
            })
            renderer.render(scene,camera);
            
            setTimeout(()=>{
                cancelAnimationFrame(req3)
            },4000)
       
            
        
        
    });
}
