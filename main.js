$(function ($) {

    const matrisC = () => {
        for (let i = 1; i <= window.x; i++) {
            $('#multiArr').append(`<div class="d-flex" id=sa${i}></div>`);
            for (let j = 1; j <= window.y; j++) {
                $(`#sa${i}`).append(`
                <input type="text"
                       id="matris_${i}x${j}"
                       title="${i}x${j}"
                       style="cursor: pointer; height: 48px; width: 63px;" />`);
            }
        }
    }    

    function matrisQ() {
        window.x = Number(prompt("Satır: "));
        window.x = window.x 
        ? window.x 
        : null;
        window.y = Number(prompt("Sütun: "));
        window.y = window.y 
        ? window.y 
        : null;

        while( true ) {            
            if ( window.x==null ||
                 window.y==null || 
                 window.x <= 0  || 
                 window.y <= 0 ) {
                return matrisQ();
            } else {
                return matrisC(), $('#matris_1x1').focus();
            }
        }
    }

    matrisQ();
    
    function TOPLA(...arr) {
        var t = 0;        
        arr = JSON.parse(`[${arr}]`);

        if (Array.isArray(arr)){
            arr = arr.map(Number).filter(function(val) {
                return !Number.isNaN(val);
            });     
        }       

        arr.forEach(element => {
            t += element;
        });

        return t;
        /*if (Array.isArray(arr)) {
            return arr.map(x => parseFloat(x)).reduce((x, y) => x + y, 0);
        }
        return arr.split(',').map(x => parseFloat(x)).reduce((x, y) => x + y, 0);*/
    }
    function CIKAR(...arr) {
        arr = JSON.parse(`[${arr}]`);
        var c = arr[0];        
        if (Array.isArray(arr)){
            arr = arr.map(Number).filter(function(val){
                return !Number.isNaN(val);
            });
        }
        for(let i=1; i<=arr.length-1; i++) {
            c -= arr[i];
        }
        return c;
    }    
    function CARP(...arr) { 
        arr = JSON.parse(`[${arr}]`);
        var r = 1;
        arr.forEach(element => {
            r *= element;
        });
        return r; 
    }
    function BOL(...arr) { 
        arr = JSON.parse(`[${arr}]`);
        var b = arr[0];
        for(let i=1; i<=arr.length-1; i++) {
            b /= arr[i];
        }
        return b;
    }

    const functionList = () => {
        window.functionLists = [
            'TOPLA(n,n+1,...) - TOPLA(1,2,3,4,...,10) gibi', 
            'CIKAR(n,n+1,...) - CIKAR(10,9,8,...,1) gibi', 
            'CARP(n,n+1,...) - CARP(1,2,3,...,10) gibi', 
            'BOL(n,n+1,...) - BOL(10,1,2)'
        ];
    }

    const functionSelected = (fk, sn, matris) => {
        let kontrol = !fk || !sn || !matris;
        if ( kontrol ) {
            return alert('Foksiyon Parametrelerinden bazıları Hatalı olabilir');
        }       
        switch (fk) {
            case "TOPLA":
                $(`#${matris}`).val(TOPLA(sn));
                $(`#${matris}`).attr('data-ress', TOPLA(sn) );
                $('#calc').val( $('#calc').val() + TOPLA(sn));
                break;
            case "CIKAR":
                $(`#${matris}`).val(CIKAR(sn));
                $(`#${matris}`).attr('data-ress', CIKAR(sn) );
                $('#calc').val( $('#calc').val() + CIKAR(sn));
                break;
            case "CARP":
                $(`#${matris}`).val(CARP(sn));
                $(`#${matris}`).attr('data-ress', CARP(sn) );
                $('#calc').val( $('#calc').val() + CARP(sn));
                break;
            case "BOL":
                $(`#${matris}`).val(BOL(sn));
                $(`#${matris}`).attr('data-ress', BOL(sn) );
                $('#calc').val( $('#calc').val() + BOL(sn));
                break;
            default:
                alert('Kullanmış Olduğunuz Fonksiyon Tanımlanmış bir Fonksiyon Değil!');
                console.log('Fonksiyon Listesinde Bulunmuyor!');
            break;
        }
        /*if ( fk == "TOPLA") {return 0;}
        if ( fk == "CIKAR") {return 0;}
        if ( fk == "CARP") {return 0;}
        if ( fk == "BOL") {return 0;}*/
    }

    const functionListCall = () => {
        functionList();
        window.functionLists.forEach(element => {
            console.log(element);
        });
    }

    const functions = () => {
        window.functions = [
            'TOPLA',
            'CIKAR',
            'CARP',
            'BOL'
        ];
    }

    $('[id*=matris_]').on('click', function() {
        if ( this.value && this.dataset.ress && this.dataset.deff ) {
            $(this).val( this.dataset.ress );
            $('#calc').val( this.dataset.deff );
            return 0;
        }
        //return $('#calc').val('');
    });

    $('[id*=matris_]').on('input', function() {
        //$('#calc').val( $(this).val() );
        if ( this.value.length == 1 && this.value == "=" ) {
            return functionListCall();
        }
    });

    $('[id*=matris_]').on('keyup', function(event) {
        if ( event.which == 13) {
            if ( this.value.length == 0 ) {
                $(this).removeAttr('data-deff');
                $(this).removeAttr('data-ress');
                $(this).removeAttr('title');
                return 0;
            }
            let sn = this.value.split('(')[1] 
            ? this.value.split('(')[1].split(')')[0].toString() 
            : null;
            let fk = this.value.split('=')[1] 
            ? this.value.split('=')[1].split('(')[0] 
            : null;
            let matris = $(this).attr('id') ?? null;
            let kontrol = !sn || !fk || !matris;
            if ( kontrol ) {
                alert(`Fonksiyon Parametrelerinden bazıları Hatalı Olabilir!.. 
                veya Tanımsız bir Fonksiyon Çağırmış olabilirsiniz.`);
                return 0;
            }
            $(this).attr('data-deff', this.value);
            $(this).attr('title', ''+$(this).attr('title')+' dbclick formülü verir.');
            $('#calc').val('');
            return functionSelected(fk,sn,matris);
            //let f = this.value.split('(')[1].split(')')[0].toString().split(',');
            //console.log('F DURUMU', typeof(f), f)
            //console.log('TOPLAM DURUMU', TOPLA(...f));
        }
    });

    $('[id*=matris_]').on('dblclick', function(event) {
        if ( !!this.value ) {
            $(this).val( this.dataset.deff );
            $('#calc').val( this.dataset.deff );
            this.focus();
            return 0;
        }
        if( !this.value ) {
        	return this.focus();            
        }
    });

    
    $('[id*=matris_]').on('click', function(e) {
        if( e.ctrlKey && this.value ) { 
            let id = $(this).attr('id');           
            $('#calc').val( 
                $('#calc').val().indexOf('x') == -1
                    ? $('#calc').val() + id.split('_')[1] 
                    : $('#calc').val() + ',' + id.split('_')[1]
            );
        }
    });

    $('#clear').click(function() {
        return $('#calc').val('');
    });

    window.sayac = 1;
    $('#calc').on('keyup', function(event) {
        if ( event.which == 13 && $(this).val().indexOf('x') != -1 ) {
            var fk = $(this).val() 
            ? $(this).val().split('(')[0].split('=')[1] 
            : null;
            if ( !fk ) {
                return alert('Parametre Kullanımı Hatalı!..');
            }
            if ( fk ) {
                functions();
                $.each([window.functions], function(i, el) {
                    if ( el.indexOf(fk) == -1 ) {
                        return alert('Parametre Foknsiyon Listesinde Bulunmuyor!..');
                    }
                });
            }
            var matrisVal = $(this).val() 
            ? $(this).val().split('(')[1].split(')')[0] 
            : null;
            if ( !matrisVal ) {
                return alert('Fonksiyon Parametreleri veya Fonksiyon Kullanımı Hatalı!');
            }
            var kontrol = Array.from(matrisVal);
            kontrol.forEach(element => {
                if (element == ',') {
                    window.sayac++;
                }
            });
            let arr = matrisVal.split(',', window.sayac); 
            let nums = [];
            arr.forEach(element => {
                nums.push($(`[id*=matris_${element}]`).val());
            }); //nums = nums.map(Number);
            nums = nums.toString();            
            calcFunctionFF(fk, nums);
            window.sayac = 1;
            return 0;
        }        
        
    });

    const calcFunctionFF = (fk, arr) => {
        switch (fk) {
            case "TOPLA":
                $('#calc').val( TOPLA(arr) );                            
                break;
            case "CIKAR":
                $('#calc').val( CIKAR(arr) );
                break;
            case "CARP":
                $('#calc').val( CARP(arr) );
                break;
            case "BOL":
                $('#calc').val( BOL(arr) );
                break;
            default:
                alert('Kullanmış Olduğunuz Fonksiyon Tanımlanmış bir Fonksiyon Değil!');
                console.log('Fonksiyon Listesinde Bulunmuyor!');
            break;
        }
    }

});
