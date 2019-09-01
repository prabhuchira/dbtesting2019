const yargs = require('yargs');

yargs.command({
    command:'phone',
    builder:{
        oneplus:{
            describe:'Used too set for oneplus phones',
            demandOption:true,

        },
        price:{
            describe:'Used to set price for an product',
            demandOption:true
        }
    },
    handler:(argv)=>{
        console.log('A list for options' + argv.oneplus + ' and the price is ' + argv.price)
    }
})


yargs.parse();
