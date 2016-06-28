/*CSOM to update and create & update list item */
function CSOMOperations(columnData,listName,action,itemID){
	var context = SP.ClientContext.get_current();
	var web = context.get_web();
	var list = web.get_lists();
    var targetList = list.getByTitle(listName);
    var item;
    switch(action){
		case 'create':    	
			var listItemCreation = new SP.ListItemCreationInformation();
	    	item = targetList.addItem(listItemCreation);
    	    for(var title in columnData){
		    	item.set_item(title,columnData[title]);
			}
		    item.update();
		    context.load(item);
	    break;
	    case 'update':
	    	item = targetList.getItemById(itemID);
	    	context.load(item);
	    	context.executeQueryAsync(function(){ 
	    	for(var title in columnData){
			    item.set_item(title,columnData[title]);
			}
			    item.update();
			    context.load(item);
			    context.executeQueryAsync(function(){
			    	console.log('updated successfully')
				},function(sender, args){
				    console.error("Something went wrong"+args.get_message());
				});
	    	},function(sender, args){ 
    			console.log("Something went wrong"+args.get_message());
    		});
	    break;
    }
    context.executeQueryAsync(function(){
    	console.log("Item created "+item.get_id());
   	},function(sender, args){ 
    	console.log("Somethig went wrong: "+args.get_message());
    });
}
