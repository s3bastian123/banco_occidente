$(document).ready(function() {
   $.getJSON('../assets/js/json/data.json',function(data){

        for(var i=1; i<=4; i++){
            $('.buttons').append('<li class="button" data-bank="'+i+'"><a href="#">Banco '+i+'</a></li>')
        }

        $('.buttons li:nth-of-type(1)').addClass('active');
        var infoCard=0,
            id=0,
            bank=0,
            bankType=0,
            dLogo=0,
            pType=0,
            salTot='',
            salDis=0,
            pTypeShort = 0,
            pAcBal=0,
            actSal=0,
            avaSal=0,
            index=0;

        function loadData(a){
            data.forEach(card => {

                bank = card.accountInformation.bank,
                bankType = bank.slice((bank.length-1), bank.length),
                id = card.id,
                index = data.findIndex(xd => xd.id === id);
                dLogo = id.slice(0,1),
                pType = card.accountInformation.productType,
                pAcBal = card.productAccountBalances;

                switch (pType){
                    case 'CERTIFIED_DEPOSIT_TERM':
                        pType = "Certificado de depósito a término";
                        pTypeShort = "cdt";
                        salDis= 0;
                        id =id;
                        break;
                    case 'CREDIT':
                        pType = "Crédito";
                        pTypeShort = "oc";
                        salDis= 0;
                        id =id;
                        break;
                    case 'CREDIT_CARD':
                        pType = "Tarjeta de crédito";
                        pTypeShort = "cc";
                        salTot= card.productAccountBalances.cupo_total.amount;
                        salDis= card.capacity;
                        id = 'XXXX XXXX XXXX '+id.slice(12,16);
                        break;
                    case 'CURRENT_ACCOUNT':
                        pType = "Cuenta corriente";
                        pTypeShort = "ca";
                        salDis= 0;
                        id =id;
                        break;
                    case 'DEPOSIT_ACCOUNT':
                        pType = "Cuenta de ahorros";
                        pTypeShort = "da";
                        salDis= 0;
                        id =id;
                        break;
                }
    
                if(bankType==a){
    
                    if(pAcBal){
    
                        if(pAcBal.saldo_actual){
                            actSal = "Saldo actual: "+pAcBal.saldo_actual.amount;
                        }
                        else{
                            actSal ="";
                        }
    
                        
                        if(pAcBal.saldo_disponible){
                            avaSal = 'Saldo disponible: '+pAcBal.saldo_disponible.amount+'<br>';
                        }
                        else{
                            avaSal ="";
                        }
    
                    }
    
                    $('.cardProduct').append('<li class="'+pTypeShort+'" data-bank="'+bankType+'"><span><label class="cardProduct__logo '+pTypeShort+'" data-card="'+dLogo+'"></label><label class="cardProduct__type">'+pType+'</label></span><span class="cardProduct__id">Nro. '+id+'</span><span class="cardProduct__sale">'+avaSal+actSal+'</span><div class="cardProduct__bar" style="width:100%"><div class="cardProduct__progress"style="width:'+salDis+'%; height:5px;"></div></div><a class="show__details" href="#" data-index="'+index+'">ver detalles</a></li>');
                }
            });
        }

        loadData(1);

        $('.buttons li').click(function(){
            $('.buttons li').removeClass('active');
            $(this).addClass('active');
            infoCard= $(this).attr('data-bank');
            $('.cardProduct').html('');

            loadData(infoCard);
        });

        $('.show__details').click(function(){
            $('.details span').remove();
            index= $(this).attr('data-index');
            $('.details').removeClass('hide');
            $('.details').append('<span class="cardProduct__id">'+data[index].id+'</span><span class="cardProduct__type"><label class="cardProduct__logo '+pTypeShort+'" data-card="'+dLogo+'"></label>'+data[index].typeAccount+'</span><span class="cardProduct__open">Fecha de apertura: '+data[index].openedDate+'</span><span class="cardProduct__close">Fecha de cierre: '+data[index].closedDate+'</span><span class="cardProduct__last">Última transcacción: '+data[index].lastTransactionDate+'</span>');
        });

        $('.close').click(function(){
            $('.details').addClass('hide');
            
        });
    });
});