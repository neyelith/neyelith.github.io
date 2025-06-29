var playerposx = 1200;
var playerposy = 600;
var vektorx = 0;
var vektory = 0;
var counting = 0; //idle animation counter
var isgrounded = false;
var knocked = false; //driving against something too fast
var knockedcounter = 0;

var pic1 = true;
var pic2 = false;

var wpressed = false;
var apressed = false;
var spressed = false;
var dpressed = false;

var level = 0;
var levellasttick = 0;

const screenheight = 900 - 100
const screenwidth = 1920 - 100

const boxlist0x = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 1500, 1400, 1100, 1000, 950, 200, 450, 700, 950, 1050, 1150, 1250, 1350, 1300, 1550, 1300, 1550, 1300, 1550];
const boxlist0y = [900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 800, 800, 700, 600, 500, 700, 600, 500, 400, 400, 400, 400, 400, 200, 200, 100, 100, 0, 0];

const boxlist1x = [0, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 1100, 1000]
const boxlist1y = [900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 850, 850]

const levelobjectlistx = [boxlist0x, boxlist1x]
const levelobjectlisty = [boxlist0y, boxlist1y]

function startGame() {
    //get keyboard inputs
    document.addEventListener("keydown", function (event) {
        if (event.key == "w") {
            wpressed = true
        };
        if (event.key == "a") {
            apressed = true;
        };
        if (event.key == "s") {
            spressed = true
        };
        if (event.key == "d") {
            dpressed = true
        };
    });
    document.addEventListener("keyup", function (event) {
        if (event.key == "w") {
            wpressed = false
        };
        if (event.key == "a") {
            apressed = false;
        };
        if (event.key == "s") {
            spressed = false
        };
        if (event.key == "d") {
            dpressed = false
        };
    });
    //draw mrlonglegs
    const leg = document.createElement("img");
    leg.setAttribute("id", "mrlonglegs")
    document.body.appendChild(leg);
    //load first map
    for (let i = 0; i < levelobjectlistx[0].length; ++i) {
        const box = document.createElement("img");
        box.setAttribute("src", "textures\\objects\\box0.png");
        box.setAttribute("style", "position:absolute;left:" + levelobjectlistx[0][i] + "px;top:" + levelobjectlisty[0][i] + "px");
        box.setAttribute("id", "level0object");
        document.body.appendChild(box);
    };
}
function gameupdate() {
    //check which level 
    if (playerposy <= 0) {
        level += 1
        playerposy += screenheight
    }
    else if (playerposy >= screenheight + 100) {
        level -= 1
        playerposy -= screenheight
    }
    console.log(level);
    if (level != levellasttick) {
        //draw boxes
        for (let i = 0; i < levelobjectlistx[level].length; ++i) {
            const box = document.createElement("img");
            box.setAttribute("src", "textures\\objects\\box0.png");
            box.setAttribute("style", "position:absolute;left:" + levelobjectlistx[level][i] + "px;top:" + levelobjectlisty[level][i] + "px");
            box.setAttribute("id", "level0object");
            document.body.appendChild(box);
        };
        for (let i = 0; i < levelobjectlistx[levellasttick].length; ++i) {
            document.getElementById("level0object").remove()
        }
    }

    levellasttick = level;
    //isgrounded checks
    isgrounded = false
    for (let i = 0; i < levelobjectlistx[level].length; ++i) {
        const x = levelobjectlistx[level][i]
        const y = levelobjectlisty[level][i]
        if (playerposx > (x + 50) && playerposx <= (x + 100) && playerposy > (y - 90) && playerposy < (y + 90) && vektorx < 0) {
            knocked = true
            playerposx = x + 100
        }
        if (playerposx >= (x - 100) && playerposx < (x - 50) && playerposy > (y - 90) && playerposy < (y + 90) && vektorx > 0) {
            knocked = true
            playerposx = x - 100
        }
        if (playerposx > (x - 100) && playerposx < (x + 100) && playerposy >= (y - 100) && playerposy < (y - 50) && vektory >= 0) {
            vektory = 0
            playerposy = y - 100
            isgrounded = true
        }
        if (playerposx > (x - 100) && playerposx < (x + 100) && playerposy > (y + 50) && playerposy <= (y + 100) && vektory < 0) {
            vektory = 0
            playerposy = y + 100
        }

    }
    //gravity
    if (isgrounded == false) {
        vektory += 1
    }
    //playercontrol
    if (knocked == false) {
        if (wpressed && isgrounded) {
            vektory -= 16.5
        }
        if (apressed && isgrounded && spressed == false) {
            vektorx -= 3
        }
        if (dpressed && isgrounded && spressed == false) {
            vektorx += 3
        }
    };
    //border left, right, bottom
    if (playerposx >= screenwidth && vektorx > 0) {
        knocked = true
        playerposx = screenwidth
    }
    if (playerposx <= 0 && vektorx < 0) {
        knocked = true
        playerposx = 0
        if (vektorx > -2 && vektorx < 2) {
            vektorx = 0
        }
    }
    //knocked
    if (knocked && knockedcounter == 0) {
        if (Math.sqrt(vektorx * vektorx + vektory * vektory) < 25.5) {
            knocked = false
        }
        vektory = -16.5
        vektorx = -0.4 * vektorx
    };
    if (knocked) {
        knockedcounter += 1
    }
    if (knockedcounter >= 90) {
        knockedcounter = 0
        knocked = false
    }
    //friction
    vektorx = vektorx * 0.98
    if (isgrounded && spressed == false) {
        vektorx = vektorx * 0.92
    }
    if (vektorx > -2 && vektorx < 2) {
        vektorx = 0
    }
    //movement
    playerposx += vektorx
    playerposy += vektory

    //border left, right, bottom
    if (playerposx >= screenwidth && vektorx > 0) {
        playerposx = screenwidth
    }
    if (playerposx <= 0 && vektorx < 0) {
        playerposx = 0
    }
    //mr longlegs zeichnen
    document.getElementById("mrlonglegs").setAttribute("style", "position:absolute;left:" + playerposx + "px;top:" + playerposy + "px");

    //moving checks
    moving = true
    if (vektorx > -2 && vektorx < 2) {
        vektorx = 0
    }
    if (vektorx == 0 && isgrounded) {
        moving = false
    }
    //picking the player picture
    if (moving) {
        document.getElementById("mrlonglegs").setAttribute("src", "textures\\player\\moving.png");
    }
    else {
        pic2 = true

        if (pic1) {
            document.getElementById("mrlonglegs").setAttribute("src", "textures\\player\\idle0.png");
            counting += 1
            pic2 = false

            if (counting > 40) {
                pic1 = false
                counting = 0
            }
        }
        if (pic2) {
            document.getElementById("mrlonglegs").setAttribute("src", "textures\\player\\idle1.png");
            counting += 1

            if (counting > 40) {
                pic1 = true
                counting = 0
            }
        }
    }
    if (spressed) {
        document.getElementById("mrlonglegs").setAttribute("src", "textures\\player\\movinglow.png");
    }
    if (knocked) {
        document.getElementById("mrlonglegs").setAttribute("src", "textures\\player\\knocked.png");
    }
}