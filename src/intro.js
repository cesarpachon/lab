var intro = ( function () {

    intro = function () {};

    var parent;
    var content;
    var txt;
    var alpha = { n:1 };
    var isDisplay = false;
    var tween = null;

    intro.init = function ( text, Parent ) {

        if( isDisplay ) return;

        parent = Parent || document.body;

        content = document.createElement( 'img' );
        content.style.cssText = "position:absolute; margin:0; padding:0; top:50%; left:50%; width:300px; height:220px; margin-left:-150px; margin-top:-110px; display:block; pointer-events:none; ";
        content.src = 'assets/textures/logo.png';
        parent.appendChild( content );

        txt = document.createElement( 'div' );
        txt.style.cssText = "font-family: Monospace; color: #AAA; font-size: 12px; text-align:center; position:absolute; margin:0; padding:0; top:50%; left:50%; width:400px; height:20px; margin-left:-200px; margin-top:110px; display:block; pointer-events:none; font-size: 12px;";
        txt.textContent = text || 'loading...';
        parent.appendChild( txt );

        isDisplay = true;

    };

    intro.clear = function () {

        if( !isDisplay ) return;

        if( tween !== null ){ TWEEN.remove( tween ); alpha = { n:1 } }

        tween = new TWEEN.Tween( alpha ).to( {n:0}, 2000 )
            .easing( TWEEN.Easing.Quadratic.Out )
            .onUpdate( function() { intro.opacity ( alpha.n ); } )
            .onComplete( function () { intro.dispose(); } )
            .start();

    };

    intro.opacity = function ( a ) {

        content.style.opacity = a;
        txt.style.opacity = a;

    }

    intro.dispose = function () {

        parent.removeChild( content );
        parent.removeChild( txt );
        isDisplay = false;

    }

    intro.message = function ( str ) {

        txt.innerHTML = str;

    }

    return intro;

})();