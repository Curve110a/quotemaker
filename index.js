var x = document.getElementById( "quoteInput" );
function addQuote ()
{

  if ( x.style.display === "block" )
  {
    x.style.display = "none";
  } else
  {
    x.style.display = "block";
  }
}

function updateQuote ()
{
  quote = document.getElementById( 'quote' ).value;
  document.getElementById( 'outputText' ).innerHTML = quote;
}
function updateAuthor ()
{
  author = document.getElementById( 'authorInput' ).value;
  document.getElementById( 'outputAuthor' ).innerHTML = author;
}

var rangeInput = document.getElementById( 'slider' );

function changeFont ()
{
  var value = rangeInput.value;
  document.getElementById( 'outputText' ).style.fontSize = value / 10 + "px";
}
function changeFontAuthor ()
{
  var valueAuthor = document.getElementById( 'slideAuthor' ).value;
  document.getElementById( 'outputAuthor' ).style.fontSize = valueAuthor / 10 + "px";
}
// function addQuotes(){
//   var sliderMax = document.getElementById('slider');
//   if(sliderMax.max == "400"){
//     sliderMax.max = "800";
//   }else{
//     if(document.getElementById('outputText').style.fontSize > "40px"){
//       document.getElementById('outputText').style.fontSize = "40px"
//     }
//     sliderMax.max = "400";
//   }


//   var before = document.head.appendChild(document.createElement("style"));
//   var after = document.head.appendChild(document.createElement("style"));

//   if(document.getElementById('checkboxQuotes').checked){
//       before.innerHTML = "#outputText:before {display: inline-block;}";
//   after.innerHTML = "#outputText:after {display: inline-block;}";
//   }else{
//     before.innerHTML = "#outputText:before {display: none;}";
//     after.innerHTML = "#outputText:after {display: none;}";
//   }


// }
linkColorsCheckbox = document.getElementById( 'linkColors' );
function linkColors ()
{

  if ( linkColorsCheckbox.checked )
  {
    document.getElementById( 'color' ).style.background = getHSL();
    document.getElementById( 'authorPalette' ).style.backgroundColor = getHSL();
    document.getElementById( 'outputAuthor' ).style.color = getHSL();
    document.getElementById( 'quotePalette' ).style.backgroundColor = getHSL();
    document.getElementById( 'outputText' ).style.color = getHSL();
    if ( hue == 1 )
    {
      document.getElementById( 'color' ).style.background = "black";
      document.getElementById( 'authorPalette' ).style.backgroundColor = "black";
      document.getElementById( 'outputAuthor' ).style.color = "black";
      document.getElementById( 'quotePalette' ).style.backgroundColor = "black";
      document.getElementById( 'outputText' ).style.color = "black";
    } else if ( hue > 299 )
    {
      document.getElementById( 'color' ).style.background = "white";
      document.getElementById( 'authorPalette' ).style.backgroundColor = "white";
      document.getElementById( 'outputAuthor' ).style.color = "white";
      document.getElementById( 'quotePalette' ).style.backgroundColor = "white";
      document.getElementById( 'outputText' ).style.color = "white";
    }
  }
}

( function ( exports )
{
  function urlsToAbsolute ( nodeList )
  {
    if ( !nodeList.length )
    {
      return [];
    }
    var attrName = 'href';
    if ( nodeList[ 0 ].__proto__ === HTMLImageElement.prototype || nodeList[ 0 ].__proto__ === HTMLScriptElement.prototype )
    {
      attrName = 'src';
    }
    nodeList = [].map.call( nodeList, function ( el, i )
    {
      var attr = el.getAttribute( attrName );
      if ( !attr )
      {
        return;
      }
      var absURL = /^(https?|data):/i.test( attr );
      if ( absURL )
      {
        return el;
      } else
      {
        return el;
      }
    } );
    return nodeList;
  }

  function screenshotPage ()
  {
    var wrapper = document.getElementsByClassName( 'screenshotArea' );
    html2canvas( wrapper, {
      onrendered: function ( canvas )
      {
        canvas.toBlob( function ( blob )
        {
          saveAs( blob, 'newQuote.png' );
        } );
      }
    } );
    // html2canvas($('#screenshotArea'),
    //   {
    //     onrendered: function (canvas) {
    //       debugger;
    //       var a = document.createElement('a');
    //       // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
    //       a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    //       a.download = 'somefilename.jpg';
    //       a.click();
    //     }
    // });
  }

  function addOnPageLoad_ ()
  {
    window.addEventListener( 'DOMContentLoaded', function ( e )
    {
      var scrollX = document.documentElement.dataset.scrollX || 0;
      var scrollY = document.documentElement.dataset.scrollY || 0;
      window.scrollTo( scrollX, scrollY );
    } );
  }

  function generate ()
  {
    screenshotPage();
  }
  exports.screenshotPage = screenshotPage;
  exports.generate = generate;
} )( window );


function readURL ( input )
{
  if ( input.files && input.files[ 0 ] )
  {
    document.getElementById( 'backgroundImageOutput' ).style.display = "block";

    var reader = new FileReader();

    reader.onload = function ( e )
    {
      $( '.image-upload-wrap' ).hide();

      $( '.file-upload-image' ).attr( 'src', e.target.result );
      $( '.file-upload-content' ).show();

      $( '.image-title' ).html( input.files[ 0 ].name );
    };

    reader.readAsDataURL( input.files[ 0 ] );


  } else
  {
    removeUpload();
  }
};

var bar = document.getElementById( 'bar' )
function hideOverlay ()
{
  document.getElementById( 'overlayScreen' ).style.display = "none";
  // bar.classList.add('animated','bounceInLeft')
};


// Simple script to random choose google font
// You want to use your own API_KEY you can get in https://developers.google.com/fonts/docs/developer_api
const API_KEY = 'AIzaSyCRacq7vgBMTq4WOiWBhZOsf5QOtbT-rTU';
let fontsList = [];
const el = document.querySelector( ".fa-random" );
el.addEventListener( 'click', () =>
{
  const choosedFont = loadRandomFont( fontsList );
  updateFont( el, choosedFont );
} );
async function loadFontsList ()
{
  try
  {
    const result = await fetch( 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY );
    const data = await result.json();
    console.log( 'loaded google fonts list: ', data.items.length );
    return data.items;
  } catch ( error )
  {
    console.log( 'loadFontsList', error, error.message );
  }
}
function loadRandomFont ( fontsList )
{
  const randomIndex = Math.floor( Math.random() * fontsList.length );
  const choosedFont = fontsList[ randomIndex ].family;
  WebFont.load( {
    google: {
      families: [ choosedFont ]
    }
  } );
  console.log( 'choosed font: ', choosedFont );
  return choosedFont;
}
function updateFont ( el, choosedFont )
{
  var author = document.getElementById( 'outputAuthor' );
  el = document.querySelector( ".outputText" );
  el.style.fontFamily = choosedFont;
  el.setAttribute( 'title', choosedFont );
  author.style.fontFamily = choosedFont;
  author.setAttribute( 'title', choosedFont );
}
async function font ()
{
  fontsList = await loadFontsList();
  // const choosedFont = loadRandomFont(fontsList);
  // updateFont(el, choosedFont);
}
font();
function randomize ()
{
  var randomColor = '#' + ( '00000' + ( Math.random() * 16777216 << 0 ).toString( 16 ) ).substr( -6 );
  document.getElementById( 'outputText' ).style.color = randomColor;
  document.getElementById( 'quotePalette' ).style.backgroundColor = randomColor;
  document.getElementById( 'outputAuthor' ).style.color = randomColor;

};
var fromAuthorVar = false;
var fromQuoteVar = false;
function fromAuthor ()
{
  fromAuthorVar = true;
}
// function fromAuthor() {
//   fromQuoteVar = true;
// }
// popup quote color
function popup ()
{
  fromAuthorVar = false;
  var popup = document.getElementById( 'colorPickerContainer' );
  popup.classList.toggle( 'colorPickerContainerDisplay' );

}


let hue = 1;
let sat = 100;
let light = 55;

const hslToHex = ( h, s, l ) =>
{
  if ( hue != 1 )
  {

    if ( fromAuthorVar == true )
    {
      document.getElementById( 'outputAuthor' ).style.color = getHSL();
    } else
    {
      document.getElementById( 'outputText' ).style.color = getHSL();
    }
  }

  h /= 360;
  s /= 90;
  l /= 100;
  let r, g, b;
  if ( hue == 1 && fromAuthorVar == false )
  {
    light = 0;
    document.getElementById( 'outputText' ).style.color = "black";
    document.getElementById( 'color' ).style.background = "black";
    document.getElementById( 'quotePalette' ).style.backgroundColor = "black"

  } else if ( hue > 1 )
  {
    light = 55;
  }
  if ( fromAuthorVar == true && hue == 1 )
  {
    document.getElementById( 'color' ).style.background = "black";
    document.getElementById( 'authorPalette' ).style.backgroundColor = "black";
    document.getElementById( 'outputAuthor' ).style.color = "black";
  }
  if ( hue > 299 )
  {
    light = 100;
    document.getElementById( 'color' ).style.background = "white";
    if ( fromAuthorVar == true )
    {
      document.getElementById( 'outputAuthor' ).style.color = "white";
    } else
    {
      document.getElementById( 'outputText' ).style.color = "white";
    }

    // document.getElementById('colorPicker').style.backgroundColor = "white !important";
  } else if ( hue < 300 )
  {
    light = 55;
  }
  if ( s === 0 )
  {
    r = g = b = l; // achromatic
  } else
  {
    const hue2rgb = ( p, q, t ) =>
    {
      if ( t < 0 ) t += 1;
      if ( t > 1 ) t -= 1;
      if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
      if ( t < 1 / 2 ) return q;
      if ( t < 2 / 3 ) return p + ( q - p ) * ( 2 / 3 - t ) * 6;
      return p;
    };
    const q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb( p, q, h + 1 / 3 );
    g = hue2rgb( p, q, h );
    b = hue2rgb( p, q, h - 1 / 3 );
  }
  const toHex = x =>
  {
    const hex = Math.round( x * 255 ).toString( 16 );
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${ toHex( r ) }${ toHex( g ) }${ toHex( b ) }`;
}

const colorChange = () =>
{
  console.log( 'change color' )
  if ( linkColorsCheckbox.checked )
  {
    document.getElementById( 'color' ).style.background = getHSL();
    document.getElementById( 'authorPalette' ).style.backgroundColor = getHSL();
    document.getElementById( 'outputAuthor' ).style.color = getHSL();
    document.getElementById( 'quotePalette' ).style.backgroundColor = getHSL();
    document.getElementById( 'outputText' ).style.color = getHSL();
    if ( hue == 1 )
    {
      document.getElementById( 'color' ).style.background = "black";
      document.getElementById( 'authorPalette' ).style.backgroundColor = "black";
      document.getElementById( 'outputAuthor' ).style.color = "black";
      document.getElementById( 'quotePalette' ).style.backgroundColor = "black";
      document.getElementById( 'outputText' ).style.color = "black";
    } else if ( hue > 299 )
    {
      document.getElementById( 'color' ).style.background = "white";
      document.getElementById( 'authorPalette' ).style.backgroundColor = "white";
      document.getElementById( 'outputAuthor' ).style.color = "white";
      document.getElementById( 'quotePalette' ).style.backgroundColor = "white";
      document.getElementById( 'outputText' ).style.color = "white";
    }
  }
  // document.getElementById('outputAuthor').style.color = getHSL();
  const swatch = document.querySelector( '.swatch' );
  swatch.style.backgroundColor = getHSL();
  swatch.value = getHEX();




  if ( fromAuthorVar == true && hue == 1 )
  {
    document.getElementById( 'outputAuthor' ).style.color = "black";
  } else if ( fromQuoteVar == true )
  {
    document.getElementById( 'outputText' ).style.color = "black";
  }


  if ( fromAuthorVar == true )
  {
    if ( hue != 1 )
    {
      document.getElementById( 'authorPalette' ).style.backgroundColor = getHSL();
    } else
    {
      document.getElementById( 'authorPalette' ).style.backgroundColor = "black";
    }

  } else if ( hue != 1 )
  {
    document.getElementById( 'quotePalette' ).style.backgroundColor = getHSL();
  }

};

const getHEX = () =>
{
  return hslToHex( hue, sat, light );
};
const getHSL = () =>
{
  return `hsl(${ hue }, ${ sat }%, ${ light }%)`;
};

const main = () =>
{
  const hueInput = document.querySelector( 'input[name=hue]' );
  hueInput.addEventListener( 'input', () =>
  {
    hue = hueInput.value;
    colorChange();
  } );


  colorChange();
};

document.addEventListener( 'DOMContentLoaded', main );
// end popup quote
function commingSoon ()
{
  document.getElementById( 'commingSoon' ).classList.toggle( 'commingSoon' );
}

// menu
var imageIcon = document.getElementById( 'imageIcon' );
var paletteIcon = document.getElementById( 'paletteIcon' );
var fontIcon = document.getElementById( 'fontIcon' );
var randomIcon = document.getElementById( 'randomIcon' );
var backgroundMenu = document.getElementById( 'backgroundMenu' );
var colorMenu = document.getElementById( 'colorMenu' );
var textMenu = document.getElementById( 'textMenu' );
var randomMenu = document.getElementById( 'randomizeMenu' );
imageIcon.addEventListener( 'click', () =>
{
  reset();
  imageIcon.style.background = "#f1f1f1";
  imageIcon.style.color = "#4c9991";
  backgroundMenu.style.display = "grid"
} );
paletteIcon.addEventListener( 'click', () =>
{
  reset();
  paletteIcon.style.background = "#f1f1f1";
  paletteIcon.style.color = "#4c9991";
  colorMenu.style.display = "grid"
} );

fontIcon.addEventListener( 'click', () =>
{
  reset();
  fontIcon.style.background = "#f1f1f1";
  fontIcon.style.color = "#4c9991";
  textMenu.style.display = "grid"
} );

randomIcon.addEventListener( 'click', () =>
{
  // reset();
  // randomIcon.style.background = "#f1f1f1";
  // randomIcon.style.color = "#4c9991";
  // randomMenu.style.display = "grid"
} );
function reset ()
{
  imageIcon.style.background = "#4c9991";
  imageIcon.style.color = "#f1f1f1";
  paletteIcon.style.background = "#4c9991";
  paletteIcon.style.color = "#f1f1f1";
  fontIcon.style.background = "#4c9991";
  fontIcon.style.color = "#f1f1f1";
  randomIcon.style.background = "#4c9991";
  randomIcon.style.color = "#f1f1f1";
  backgroundMenu.style.display = "none";
  colorMenu.style.display = "none";
  textMenu.style.display = "none";
  randomMenu.style.display = "none";
}
var valueWidth = document.getElementById( 'inputWidth' ).value;
var valueHeight = document.getElementById( 'inputHeight' ).value;
function changeWidth ()
{
  var valueWidth = document.getElementById( 'inputWidth' ).value;
  if ( valueWidth > window.innerWidth )
  {
    maxWidth = window.innerWidth - 500;
    document.getElementById( 'inputWidth' ).value = maxWidth;
    document.getElementById( 'wrapper' ).style.width = maxWidth + "px";
    document.getElementById( 'screenshotArea' ).style.width = maxWidth + "px";
  } else
  {
    document.getElementById( 'wrapper' ).style.width = valueWidth + "px";
    document.getElementById( 'screenshotArea' ).style.width = valueWidth + "px";
  }

}
function changeHeight ()
{
  var valueHeight = document.getElementById( 'inputHeight' ).value;
  //   if(valueHeight>window.innerHeight){
  //     document.getElementById('inputHeight').value = window.innerHeight;
  //   }
  //   document.getElementById('wrapper').style.height = valueHeight + "px";
  //   document.getElementById('screenshotArea').style.height = valueHeight + "px";
  // }
  if ( valueHeight > window.innerHeight )
  {
    maxHeight = window.innerHeight - 50;
    document.getElementById( 'inputHeight' ).value = maxHeight;
    document.getElementById( 'wrapper' ).style.height = maxHeight + "px";
    document.getElementById( 'screenshotArea' ).style.height = maxHeight + "px";
  } else
  {
    document.getElementById( 'wrapper' ).style.height = valueHeight + "px";
    document.getElementById( 'screenshotArea' ).style.height = valueHeight + "px";
  }
}

function resetQuote ()
{
  document.getElementById( 'backgroundImageOutput' ).style.display = "none";
  document.getElementById( 'outputText' ).style.fontFamily = "Arial, Helvetica, sans-serif";
  document.getElementById( 'outputAuthor' ).style.fontFamily = "Arial, Helvetica, sans-serif";
  document.getElementById( 'outputText' ).style.color = "black";
  document.getElementById( 'outputAuthor' ).style.color = "black";
}

/*
  - Specificity(inline, id, class) 
  - addEventListener instead of html events
  - Promises (then / async await)
  - difference between var/let/const
  - What is the error object thats given in catch
  - prefer querySelector / querySelectorAll
  - use css classes for styling
  - use functions only for 1 action (SOLID principles)
*/

const ui = {
  imageInput: document.querySelector( "#urlInput" ),
  image: document.querySelector( ".file-upload-image" ),
  download: document.querySelector( "#download" )
}


async function setBackground ()
{
  // If input then set current image
  if ( ui.imageInput.value.length > 0 )
  {
    // ui.image.src = state.url
    ui.image.src = ui.imageInput.value
    // perhaps remove show class after download? :)
    ui.image.classList.add( 'show' );
  }

  try
  {
    const response = await fetch( ui.imageInput.value );
    const blob = await response.blob();

    // Generic function (reuseable)
    const reader = new FileReader();
    reader.readAsDataURL( blob );
    // Convert naar promise (async/await)
    reader.onloadend = function ()
    {
      const base64data = reader.result;
      console.log( { base64data } );
      ui.image.src = base64data;
    }
  } catch ( err )
  {
    ui.image.src = "#";
    document.getElementById( 'urlInput' ).value = "";
    // do w.e
    alert( "You can't use this image, its protected" );
    
  }
}