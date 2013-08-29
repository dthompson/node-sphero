#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <wiringPi.h>


int main ( int argc, char** argv )
{
  if( argc < 2 ) {
    printf("usage: sudo ./pwm 10");
    exit(1);
  }

  int dur = atoi( argv[1] );

  wiringPiSetup () ;
  pinMode (1, OUTPUT) ;

  double factor = 3.1415 / 4000;
  unsigned long start = millis();

  int i;
  for ( i = 0; ; i++) {
    unsigned long now = millis();

    if( 0 < dur && (dur*1000) < (now-start) ) {
      exit(0);
    }

    double val = (256 * sin( (now - start) * factor ));

    val = (512 + val)/2;

    digitalWrite(1,1);
    delayMicroseconds(2*val);
    digitalWrite(1,0);
    delayMicroseconds(4*val);
    delayMicroseconds((1024/2.0)-val);
  }

}
