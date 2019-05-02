import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DonutService {
  donutdoc;
  donutcollection: AngularFirestoreCollection;
  donutArray= [];

  constructor(public afs: AngularFirestore){
    setTimeout(()=>{
      this.donutcollection = this.afs.collection('donut');
      this.donutdoc = this.donutcollection.doc('dn').get();
      this.donutdoc.subscribe((value)=>{
        this.donutArray.push(value.data().donutarr[1])
        this.donutArray.push(value.data().donutarr[2])
        this.donutArray.push(value.data().donutarr[4])
        this.donutArray.push(value.data().donutarr[3])
        this.donutArray.push(value.data().donutarr[0])
        this.donutArray.push(value.data().donutarr[5])
      })
    },1500)

   }
   async returnArr(){
    // await setTimeout(()=>{
    //   this.donutcollection = this.afs.collection('donut');
    //   this.donutdoc = this.donutcollection.doc('dn').get();
    //   this.donutdoc.subscribe((value)=>{
    //     this.donutArray.push(value.data().donutarr[1])
    //     this.donutArray.push(value.data().donutarr[2])
    //     this.donutArray.push(value.data().donutarr[4])
    //     this.donutArray.push(value.data().donutarr[3])
    //     this.donutArray.push(value.data().donutarr[0])
    //     this.donutArray.push(value.data().donutarr[5])
    //   })
    // },1500)
    // return this.donutArray;
   }
}
