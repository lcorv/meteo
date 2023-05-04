import {
  trigger,
  style,
  animate,
  transition,
  query,
  group,
  state,
} from '@angular/animations';

export function sunrise() {
  return trigger('sunrise', [
  
    transition(':enter', [
      style({
        transform:"translateY(30px) translateX(-30px)",
        backgroundColor:"#f60",
       // boxShadow: '0px 0px 10px 5px #f60'
      }),
      animate(
        '3000ms 1s',
        style({
          transform: 'translateX(0px) translateY(-30px)',
          backgroundColor: '#fe6',
         // boxShadow: '0px 0px 30px 5px #fe6'
          
        })
      ),
    ]),
  ]);
}
export function sunset() {
  return trigger('sunset', [
  
    transition(':enter', [
      style({
        transform:" translateX(-30px) translateY(-45px)",
        backgroundColor:"#fe6",
      //  boxShadow: '0px 0px 30px 5px #fe6'
      }),
      animate(
        '3000ms 1s',
        style({
          transform: 'translateY(5px)',
          backgroundColor: '#f60',
        //  boxShadow: '0px 0px 10px 5px #f605'
          
        })
      ),
    ]),
  ]);
}
export function navbar() {
  return trigger('navbar', [
    transition(':enter', [
      style({
        transform: 'translateY(-100%)',
      }),
      animate(
        500,
        style({
          transform: 'translateY(0)',
        })
      ),
    ]),
  ]);
}
export function flyIn() {
  return trigger('flyIn', [
    transition(':enter', [
      style({
        transform: 'translateY(-50%)',
        opacity: 0,
      }),
      animate(
        '200ms 200ms',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
    ]),
  ]);
}
export function spread() {
  return trigger('spread', [
  
    transition(':enter', [
      style({
        transform: 'scale(0)',
        opacity: 0,
      }),
      animate(
        '200ms 200ms',
        style({
          transform: 'scale(1)',
          opacity: 1,
        })
      ),
    ]),
  ]);
}
export function bgInOut() {
  return trigger('bgInOut', [
    transition(':leave', [
      style({
    //    transform: 'translateY(0%) scale(1)',
        backgroundSize:"200%",
        opacity: 0.5,
      }),
      animate(
        "500ms ease-in",
        style({
      //    transform: 'translateY(0%) scale(0)',
          backgroundSize:"100%",
          backgroundPosition:"50% -150px",
          opacity: 0,
        })
      ),
    ]),
    transition(':enter', [
      style({
    //    transform: 'translateY(0%) scale(3)',
        backgroundSize:"400%",
        backgroundPosition:"50% -400px",
        opacity: 0,
      }),
      animate(
        "500ms ease-out",
        style({
    //      transform: 'translateY(0%) scale(1)',
          backgroundSize:"200%",
          backgroundPosition:"50% -200px",
          opacity: 0.5,
        })
      ),
    ]),
  ]);
}
export function darkBtn() {
  return trigger('darkBtn', [
    transition(':enter', [
      style({
        opacity: 1,
        display: 'block',
        transform: 'rotateY(-270deg)',
      }),
      animate(
        '200ms 300ms',
        style({
          opacity: 1,
          transform: 'rotateY(0deg)',
        })
      ),
    ]),
    transition(':leave', [
      style({
        opacity: 1,
        display: 'block',
        transform: 'rotateY(0deg)',
      }),
      animate(
        '200ms',
        style({
          opacity: 1,
          transform: 'rotateY(90deg)',
        })
      ),
    ]),
  ]);
}
export function routeAnim() {
  return trigger('routeAnim', [
    transition('1=>6',[
      style({
        position:'relative',
        overflow:'hidden'
      }),
      query(
        ':enter,:leave',
        [
          style({
            position: 'absolute',
            width: '100vw',
            display: 'block',
          })
        ],
        { optional:true }
      ),
      group([
        query(
          ':leave',
          [
            style({
              opacity:1,
              transform:'translateY(0)'
            }),
            animate(
              '200ms ease-out',
              style({
                opacity:0,
                transform:'translateY(-100%)'
              })
            )
          ]
        ),
        query(
          ':enter',
          [
            style({
              opacity:0,
              transform:'translateY(+100%)'
            }),
            animate(
              '200ms ease-out',
              style({
                opacity:1,
                transform:'translateY(0%)'
              })
            )
          ]
        ),

      ])
    ]),
    transition('6=>1',[
      style({
        position:'relative',
        overflow:'hidden'
      }),
      query(
        ':enter,:leave',
        [
          style({
            position: 'absolute',
            width: '100vw',
            display: 'block',
          })
        ],
        { optional:true }
      ),
      group([
        query(
          ':enter',
          [
            style({
              opacity:0,
              transform:'translateY(-100%)'
            }),
            animate(
              '200ms ease-out',
              style({
                opacity:1,
                transform:'translateY(0%)'
              })
            )
          ]
        ),
        query(
          ':leave',
          [
            style({
              opacity:1,
              transform:'translateY(0%)'
            }),
            animate(
              '200ms ease-out',
              style({
                opacity:0,
                transform:'translateY(100%)'
              })
            )
          ]
        ),

      ])
    ]),
    transition(':increment', [
      style({
        position: 'relative',
        overflow: 'hidden',
      }),
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            width: '100vw',
            display: 'block',
          }),
        ],
        { optional: true }
      ),
      group([
        query(
          ':leave',
          [
            style({
              opacity: 1,
              transform: 'translateX(0)',
            }),
            animate(
              '200ms ease-in',
              style({
                opacity: 1,
                transform: 'translateX(-100vw)',
              })
            ),
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({
              opacity: 1,
              transform: 'translateX(100vw)',
            }),
            animate(
              '200ms ease-in',
              style({
                opacity: 1,
                transform: 'translateX(0)',
              })
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
    transition(':decrement', [
      style({
        position: 'relative',
        overflow: 'hidden',
      }),
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            width: '100vw',
          }),
        ],
        { optional: true }
      ),
      group([
        query(
          ':leave',
          [
            style({
              opacity: 1,
              transform: 'translateX(0)',
            }),
            animate(
              '200ms ease-in',
              style({
                opacity: 1,
                transform: 'translateX(100vw)',
              })
            ),
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({
              opacity: 1,
              transform: 'translateX(-100vw)',
            }),
            animate(
              '200ms ease-in',
              style({
                opacity: 1,
                transform: 'translateX(0)',
              })
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]);
}
