/**
 * Created by mitty on 16/12/21.
 */
list.forEach(function(o){
    console.log(o.name + ':' + o.sub.length);
    o.sub.forEach(function(oo){
        console.log('  ' + oo.name + ':' + oo.sub.length);
        oo.sub.forEach(function(ooo){
            console.log('      ' + ooo);
        });
    });
});