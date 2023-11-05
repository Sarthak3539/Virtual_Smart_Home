#include<stdio.h>


int main(){
    
int a,b;
scanf("%d %d",&a,&b);
fflush(stdin);
printf("Enter the operator");
char op;
scanf("%c",&op);

if(op=='+'){
    printf("%d",a+b);
}
else if(op=='-'){
    printf("%d",a-b);
}
else if(op=='/'){
    printf("%d",a/b);
}
else if(op=='*'){
    printf("%d",a*b);
}
else{
    printf("invalid operator");
}
    return 0;
}
