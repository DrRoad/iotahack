Template.sendSMS.events({
  
    'click [data-action="sendSMS"]': function(event, template) {
  	     event.preventDefault();
         console.log('In [data-action="sendSMS"]');
         var phoneNumbers = [];
         $('.farmerslist input:checked').each(function(){
            phoneNumbers.push($(this).val());
         });
         console.debug('phoneNumbers', phoneNumbers);
        
         var smsText = $('textarea[name="smsText"]').val();
         console.debug('smsText', smsText);
    }
});

Template.sendSMS.helpers({
    
    farmerItems: function() {
        var farmers = Session.get('farmersSearchResult');
        if(farmers) {
            console.info('farmers', farmers);
        }
        else {
            console.warn('Farmers list not found in Session');                    
        }
        return farmers;
    }
});