function Toaster() {
  let temp = 10;
  let time = 100;
  let start = 0;
  let breadInToaster = false;
  let index;
  let end;
  let updating;
  let toasting;
  let progress;
  let lever = $('#lever div');

  let result = [
      ['Still bread', 'warmBread.png'],
      ['Warm bread', 'warmBread.png'],
      ['Lightly toasted', 'lightlyToasted.png'],
      ['Golden brown', 'goldenBrown.png'],
      ['Well done', 'wellDone.png'],
      ['Burnt', 'burnt.png'],
      ['Charcoal', 'burnt.png']
    ];

  let waiting = ["Tick tock tick tock", "Shouldn't be too much longer", "Patience is power", "Good things come to those who wait", "Things worth having are worth wating for", "A watched toaster never toasts", "Have you got the butter yet?"];

  $('#bread').draggable();
  $('#progress').progressbar({
    max: 100
  });

  $('.slider').slider({
    min: 100,
    max: 40000,
    stop: function(e, ui) {
      $this = $(this);
      let option = e.target.id;
      let value = $this.slider('option', 'value');
      Toaster[option] = value;
      console.log(option, Toaster[option]);
    }
  });

	$('#lever div').draggable({
        containment: 'parent',

		drag: function(e, ui) {
			let $this = $(this);
            let leverTopMargin = Number($this.css('top').match(/\d+/));

			if (breadInToaster) {
				$('#bread').css('top', (leverTopMargin - 130) + 'px');
			}
		},

        stop: function(e, ui) {
          let $this = $(this);
          let level = Number($this.css('top').match(/\d+/));

          if ( level > 120) {
            $this.draggable('option', 'disabled', true);
            springUp($this, '120px');
            start = new Date();
            toasting = setTimeout(popUp, Toaster.time);
            updating = setInterval(toastingUpdate, 5000);
            progress = setInterval(updateBar, 100);
          } else {
            springUp($this);
          }
        }
      });

  function message(information) {
    $('#toaster').prepend('<p>' + information + '<p>');
    $('#toaster p').animate({
      marginTop: '-=200px',
      opacity: 0
    }, 4000)
  }

  function toastingUpdate() {
    let randIndex = Math.floor( Math.random() * waiting.length );
    message( '... ' + waiting[randIndex] );
  }

  function springUp(el, returnPoint = 0) {
     let levelTopMargin = Number( el.css('top').match(/\d+/) );
	 el.animate({top: returnPoint}, 'fast');

     if (breadInToaster) {
         $('#bread').animate({top: (returnPoint - 130) + 'px'}, 'fast');
     }
  }

  function popUp(el, returnPoint = 0) {
    end = new Date();
    index = Math.floor(temp * (end - start) / 80000);
    $('#bread').attr( 'src', 'images/' + (result[index][1] || result[result.length - 1][1]) );

    springUp(lever);
    lever.draggable('option', 'disabled', false);

    clearInterval(updating);
    clearInterval(progress);
    setTimeout(showResult, 500);
  }

  function showResult() {
    index = Math.floor(temp * (end - start) / 70000);
    message('Here we go. Your bread is ...');

    setTimeout(function() {
      message( '... ' + (result[index][0] || result[result.length - 1][0]) );
    }, 1000);
  }

  function updateBar() {
    let percent = 100 * (new Date() - start) / Toaster.time;
    $('#progress').progressbar('value', percent);
  }

  $('#moreBread').on('click', function() {
	$('#bread').animate({top: '-130px'});
    $('#progress').progressbar('option', 'value', 0)
	breadInToaster = true;
  })

  $('#eject').on('click', function() {
    popUp(lever);
    clearTimeout(toasting);
  });
}

t = Toaster();
