function getPilihanComputer() {
	let comp = Math.random();

	if(comp < 0.34) return 'gunting';
	if(comp >= 0.34 && comp < 0.67) return 'batu';
	return 'kertas';
}

function getHasil(player, comp) {
	if(player == comp) return 'SERI!';
	if(player == 'gunting') return (comp == 'kertas') ? 'MENANG!' : 'KALAH!';
	if(player == 'batu') return (comp == 'kertas') ? 'KALAH!' : 'MENANG!';
	if(player == 'kertas') return (comp == 'batu') ? 'MENANG!' : 'KALAH!';
}

const pPlayer = document.querySelectorAll('li img');
let pScore = 0;
let cScore = 0;
pPlayer.forEach(function(pil) {
	pil.addEventListener('click', function(){
		playAudioJanken();
		const pilihanComputer = getPilihanComputer();
		const pilihanPlayer = pil.className;
		const hasil = getHasil(pilihanPlayer, pilihanComputer);

		putar();

		setTimeout(function(){
			const info = document.getElementsByClassName('info')[0];
			info.innerHTML = hasil;

			const imgComputer = document.querySelector('.area-computer img');
			imgComputer.setAttribute('src', 'img/'+ pilihanComputer +'.png');

			score(hasil);

			pemenang();

		}, 2000);
		
	});
});




// reset page
const reset = document.getElementsByClassName('reset')[0];
reset.addEventListener('click', function() {
	location.reload();
});

function putar() {
	const imgComputer = document.querySelector('.area-computer img');
	const info = document.getElementsByClassName('info')[0];
	let imgPutar = ['gunting', 'batu', 'kertas'];
	let infoPutar = ['menang!', 'kalah!', 'seri!'];
	let i = 0;
	let j = 0;
	let waktuMulai = new Date().getTime();
	setInterval(function() {

		if(new Date().getTime() - waktuMulai > 2000) {
			clearInterval;
			return;
		}

		info.innerHTML = infoPutar[j++];
		imgComputer.setAttribute('src', 'img/' + imgPutar[i++] + '.png');

		if(i == imgPutar.length) {
			i = 0;
		}
		if(j == infoPutar.length) {
			j = 0;
		}

	}, 100);

}

function pemenang() {
	// conffetti effect show up
	const scorePlayer = document.getElementsByClassName('scr-p')[0];
	const scoreComputer = document.getElementsByClassName('scr-c')[0];
	const confettiShowUp = document.getElementById('my-canvas');
	const pemenang = document.getElementsByClassName('pemenang')[0];
	const pPemenangSatu = pemenang.querySelector('.p1');
	const pPemenangDua = pemenang.querySelector('.p2');
	const close = pemenang.querySelector('.close');

	if(scorePlayer.innerHTML == 10) {
		confettiShowUp.style.display = 'inherit';
		pemenang.style.display = 'inherit';
		pPemenangSatu.innerHTML = 'selamat anda menang!';
		pPemenangDua.innerHTML = 'dengan score '+ pScore +' - '+ cScore +'';
		playAudioWon();

		close.addEventListener('click', function() {
			confettiShowUp.style.display = 'none';
			pemenang.style.display = 'none';
			location.reload();
		});
	}

	if(scoreComputer.innerHTML == 10) {
		confettiShowUp.style.display = 'inherit';
		pemenang.style.display = 'inherit';
		pPemenangSatu.innerHTML = 'Game Over, anda kalah!';
		pPemenangDua.innerHTML = 'dengan score '+ pScore +' - '+ cScore +'';
		playAudioLost();

		close.addEventListener('click', function() {
			confettiShowUp.style.display = 'none';
			pemenang.style.display = 'none';
			location.reload();
		});
	}
}

function playAudioJanken() {
	const audioJanken = document.getElementById('audio-janken');
	audioJanken.play()
}

function playAudioWon() {
	const audioWon = document.getElementById('audio-won');
	audioWon.play();
}

function playAudioLost() {
	const audioLost = document.getElementById('audio-lost');
	audioLost.play();
}


function score(hasil) {
	const scorePlayer = document.getElementsByClassName('scr-p')[0];
	const scoreComputer = document.getElementsByClassName('scr-c')[0];

	if(hasil == 'SERI!') {
		return
	}
	else if(hasil == 'MENANG!') {
		pScore += 1;
	}
	else if(hasil == 'KALAH!') {
		cScore += 1;
	}

	scorePlayer.innerHTML = pScore;
	scoreComputer.innerHTML = cScore;
};

// confetti effect (plugin) 
var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();