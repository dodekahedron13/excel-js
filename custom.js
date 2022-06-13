$(function ($) {   

    const matrisC = () => {
        for (let i = 1; i <= parseInt(window.x); i++) {
            $('#multiArr').append(`<div class="d-flex" id=sa${i}></div>`);
            for (let j = 1; j <= parseInt(window.y); j++) {
                $(`#sa${i}`).append(`
                <input type="text"
                       id="matris_${i}x${j}"
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

        while(true) {
            //console.log(typeof window.x);
            if ( window.x==null ||
                 window.y==null || 
                 window.x==0 || 
                 window.y==0 ) {
                window.x == null;
                window.y == null;
                return matrisQ();
            } else {
                matrisC();
                return $('#matris_1x1').focus();
            }
        }
    }

    matrisQ();
    
    function TOPLA(...arr){
        var t = 0;
        arr = JSON.parse(`[${arr}]`);
        
        if (Array.isArray(arr)){
            arr = arr.map(Number).filter(function(val){
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
    function CIKAR(...arr){
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
    function CARP(...arr){ 
        arr = JSON.parse(`[${arr}]`);
        var r = 1;
        arr.forEach(element => {
            r *= element;
        });
        return r; 
    }
    function BOL(...arr){ 
        arr = JSON.parse(`[${arr}]`);
        var b = arr[0];
        for(let i=1; i<=arr.length-1; i++) {
            b /= arr[i];
        }
        return b;
    }

    const functionList = () => {
        window.arr = [
            'TOPLA(n,n+1,...) - TOPLA(1,2,3,4,...,10) gibi', 
            'CIKAR(n,n+1,...) - CIKAR(10,9,8,...,1) gibi', 
            'CARP(n,n+1,...) - CARP(1,2,3,...,10) gibi', 
            'BOL(n,n+1,...) - BOL(10,1,2)'
        ];
    }

    const functionSelected = (fk, sn, matris) => {
        let kontrol = !fk || !sn || !matris;
        if ( kontrol ) {
            alert('Foksiyon Parametrelerinden bazıları Hatalı olabilir');
            return 0;
        }
        if ( fk == "TOPLA") {
            $(`#${matris}`).val(TOPLA(sn));
            $(`#${matris}`).attr('data-ress', TOPLA(sn) );
            $('#text').val( $('#text').val() + '=' + TOPLA(sn));
            return 0;
        }
        if ( fk == "CIKAR") {            
            $(`#${matris}`).val(CIKAR(sn));
            $(`#${matris}`).attr('data-ress', TOPLA(sn) );
            $('#text').val( $('#text').val() + '=' + CIKAR(sn));
            return 0;
        }
        if ( fk == "CARP") {
            $(`#${matris}`).val(CARP(sn));
            $(`#${matris}`).attr('data-ress', TOPLA(sn) );
            $('#text').val( $('#text').val() + '=' + CARP(sn));
            return 0;
        }
        if ( fk == "BOL") {
            $(`#${matris}`).val(BOL(sn));
            $(`#${matris}`).attr('data-ress', TOPLA(sn) );
            $('#text').val( $('#text').val() + '=' + BOL(sn));
            return 0;
        }
        alert('Kullanmış Olduğunuz Fonksiyon Tanımlanmış bir Fonksiyon Değil!');
        return console.log('Fonksiyon Listesinde Bulunmuyor!');
    }

    const functionListCall = () => {
        functionList();
        window.arr.forEach(element => {
            console.log(element);
        });
    }

    $('[id*=matris_]').on('click', function() {
        if ( this.value || this.dataset.ress || this.dataset.deff ) {
            $(this).val( this.dataset.ress );
            $('#text').val( this.dataset.deff );
            return 0;           
        }
        return $('#text').val('');
    });

    $('[id*=matris_]').on('input', function(event) {
        $('#text').val( $(this).val() );
        
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
            $(this).attr('title', 'dbclick formülü verir.');
            
            return functionSelected(fk,sn,matris);
            //let f = this.value.split('(')[1].split(')')[0].toString().split(',');
            //console.log('F DURUMU', typeof(f), f)
            //console.log('TOPLAM DURUMU', TOPLA(...f));
        }
    });

    $('[id*=matris_]').on('dblclick', function(event) {
        if ( !!this.value ) {
            $(this).val( this.dataset.deff );
            $('#text').val( this.dataset.deff );
            return 0;
        }
        if( !this.value ) { //...
            return 0;
        }
    });


});