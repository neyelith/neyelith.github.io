import turtle as z

import keyboard as k
import random

    
cordx=[0,0,0,0]
cordy=[0,0,0,0]
z.pensize(49)
length=1
i=int(3)
zehler=0
z.speed(50)
z.ht()
foodx=random.randint(-5, 5)
foody=random.randint(-5, 5)
foodxt=foodx*50
foodyt=foody*50    
   
while True:
    z.clear()
    z.pu()
    z.setposition(foodxt,foodyt)
    z.pd()
    z.color("red")
    z.fd(.1)
    z.bk(.1)
    z.color("green")
    z.pu()
    z.setposition(cordx[int(i-length)],cordy[int(i-length)])
    z.pendown()
    for L in range(length):
        z.setposition(cordx[int(i-length+L+1)],cordy[int(i-length+L+1)])
        
    z.setposition(cordx[int(i)],cordy[int(i)])
    i+=1
    
    for move in range(20):      #moving forward
        z.fd(2.5)
        
        if z.xcor()<=(foodxt+25) and z.xcor()>=(foodxt-25) and z.ycor()>=(foodyt-25) and z.ycor()<=(foodyt+25):     #check if near food
       
            foodx=random.randint(-5, 5)
            foody=random.randint(-5, 5)
            foodxt=foodx*50
            foodyt=foody*50
       
            length+=1

    if k.is_pressed("a"):   #turning
        z.lt(90)
    if k.is_pressed("d"):
        z.rt(90)
    cordx.append(z.xcor())
    cordy.append(z.ycor())
    broken=False
    for L in range(length):   
        if cordx[i]==cordx[i-3-L] and cordy[i]==cordy[i-3-L]:   #snakehititselfcheck
            broken=True
    if broken:
        z.bye()
        broken=False
        break