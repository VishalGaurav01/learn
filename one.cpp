// Online C++ compiler to run C++ program online
#include <bits/stdc++.h>
using namespace std;

int main() {
    cout<<"Enter the value of a"<<endl;
    int a;
    cin>>a;
    while(a--){
        int c1=0,c0=0;
        cout<<"Enter the string"<<endl;
        string s;
        cin>>s;
        for(auto it:s){
            if(it=='1') c1++;
            else c0++;
        }
        cout<<c1<<endl;
        cout<<c0<<endl;
        for(int i =0;i<s.size();i++){
            if(s[i]=='0') {
                if(c1!=0) c1--;
                else {cout<<s.size()-i<<endl;break;}
            } 
            else{
                if(c0!=0) c0--;
                else {cout<<s.size()-i<<endl;break;}
            }
        }
        if(c0 == 0 && c1 == 0)cout<<0<<endl;
    }
    return 0;
}