//run: mongo geoma geoma.js
db.geoma.drop();

var cursor = db.ma.find();

cursor.forEach(function (item){

        var geo = {
                "id": item["FEATURE_ID"],
                "name": item["FEATURE_NAME"],
                "loc": { "type":"Point", "coordinates": [ item["PRIM_LONG_DEC"] , item["PRIM_LAT_DEC"] ] }
        };

        db.geoma.insert(geo);

});

var cursor2 = db.geoma.find();
var count = 0;
cursor2.forEach(function (item){

        if(item.loc.coordinates[0].constructor !== Number || item.loc.coordinates[1].constructor !== Number){
                db.geoma.remove(item);
                count++;
                printjson(item);
        }

});

print(count);
