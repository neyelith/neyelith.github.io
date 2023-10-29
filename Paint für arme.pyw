import pygame 
import random as r
import numpy

height=800
width=1600

pygame.init()
screen = pygame.display.set_mode((width, height))
clock = pygame.time.Clock()
running = True
dt = 0
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

pygame.mouse.set_visible(0)
pygame.display.set_caption('Paint für arme')

tilelist1=numpy.random.uniform(100.0, 200.0, 128)
tilelist2=numpy.random.uniform(100.0, 200.0, 128)
tilelist3=numpy.random.uniform(100.0, 200.0, 128)

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill("grey")

    mousebuttons=pygame.mouse.get_pressed(num_buttons=5)
  
    for z in range(8):
        for i in range(16):
                
                pygame.draw.line(screen,(0.6*tilelist1[z*16+i],tilelist2[z*16+i],0.5*tilelist3[z*16+i]),(i*100,z*100+50),(i*100+100,z*100+50),100)
        
    mousepos = pygame.mouse.get_pos()
    ycoc=int(int(mousepos[1]/100)*16)
    xcoc=int(int(mousepos[0]/100))
    coc=ycoc+xcoc

    if mousebuttons[0]:
        tilelist1[coc]=255
        tilelist2[coc]=175
        tilelist3[coc]=255
    
    if mousebuttons[2]:
        tilelist1[coc]=0
        tilelist2[coc]=0
        tilelist3[coc]=0
    
    if mousebuttons[1]:
        tilelist1[coc]=0
        tilelist2[coc]=255
        tilelist3[coc]=0

    if mousebuttons[3]:
        tilelist1[coc]=50
        tilelist2[coc]=50
        tilelist3[coc]=255

    if mousebuttons[4]:
        tilelist1[coc]=255
        tilelist2[coc]=0
        tilelist3[coc]=0
    if mousebuttons[0]:
        if mousebuttons[2]:
            tilelist1[coc]=255
            tilelist2[coc]=150
            tilelist3[coc]=0
       
    
    pygame.draw.circle(screen, "red", mousepos, 10)
  
    pygame.display.flip()

    dt = clock.tick(60) / 1000

    
    
pygame.quit()
