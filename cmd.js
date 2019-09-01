console.log(process.argv[2])

const yargs = require('yargs');

yargs.command({
    command:'drone',
    builder:{
        weapons:{
            description:'List specs of weapons',
            demandOption:true,
            handler:function(){
                console.log('weapons is init')
            }
        }
    },
    handler:(argv)=>{
        console.log('This is a drone' + argv.weapons)
    }
})


yargs.command({
    command:'jet',
    builder:{
        weapons:{
            describe:'Used to insert weapons',
            demandOption:'true',
            type:'string'
        },
        fuel:{
            describe:'Used to specify fuel',
            demandOption:false,
            
        }
    }
    ,
    handler:function(argv){
        if(argv.fuel == undefined){
            argv.fuel = 0.0 
        }
        console.log('Jet is ready with ' + argv.weapons + ' and ' + argv.fuel + ' litres')
    }
})

// console.log(yargs.argv.weapons)
// console.log('%d',yargs.argv.weapons)



yargs.parse();