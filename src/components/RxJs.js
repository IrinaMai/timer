// import React, {useState} from 'react'
// import { interval, of, from, Observable, fromEvent, timer, range} from 'rxjs';
// import { take, map, filter, scan } from 'rxjs/operators'

// const subscription = interval(500).subscribe(v => console.log("interval", v))
// setInterval(() => {
// subscription.unsubscribe()
// }, 4000)

// timer(500).subscribe(v => console.log("timer", v))

// range(42, 10).subscribe(v => console.log(v))

// const strim$  = of(1,2,3,4,5,6,7,8,9,)
// strim$.subscribe(res => console.log(res))

// const arr$ = from([1,2,3,4,5,6]).pipe(
//   scan((acc, i) => acc.concat(i), [])
// )
// arr$.subscribe(res => console.log(res))

// const strim$ = new Observable(observer => {
//   observer.next(people.filter(item => item.age >= 18).map(item => item.name))
//   //observer.error("Something go wrong")
//   observer.complete()
    
// })

// strim$.subscribe({
//   next(val) { console.log("Val: ", val) },
//   error(error) { console.log("Error: ", error) },
//   complete(){console.log("Comleated")}
// })





export const RxJs =() => {

  // const hndlMouseMoe = (e) => {
  //   // console.log(e)
  //   const rect  = e.target.getBoundingClientRect()
  //     fromEvent(e.target, "mousemove")
  //     .pipe(
  //     map(e => ({x: e.pageX - rect.left, y: e.pageY - rect.top, ctx: e.target.getContext("2d")}))
  //   )
  //   .subscribe((res) => res.ctx.fillRect(res.x, res.y, 2, 2))
  // }

  // const hndlClick = (e) => {

  //   const btnClick$ = fromEvent(e.currentTarget, 'click')
  //   btnClick$.subscribe(e => {
  //     const myCanvas = document.getElementById("myCanvas")
  //     myCanvas.getContext("2d").clearRect(0, 0, myCanvas.width, myCanvas.height )
  //   })
  
  //   };


 

  return(

<div className="container">
  <div id="creation" >
    <canvas id = "myCanvas"  width="500" height="200" style={{border: "1px solid #eee"}} ></canvas>
    <button className="btn" id="clear" >Очистить</button>
    <hr/>
  </div>


</div>

  )

}