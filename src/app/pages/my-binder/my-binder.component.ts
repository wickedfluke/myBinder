import { Component, HostListener, OnInit } from '@angular/core';

// **SPIEGAZIONE CORS E SOLUZIONE**
// I link diretti a siti come Cardmarket vengono bloccati dai browser per sicurezza (CORS).
// La soluzione migliore è scaricare le immagini e metterle nella cartella 'src/assets/cards' del tuo progetto.
// Poi, inserisci qui i percorsi relativi a quelle immagini, come negli esempi qui sotto.
const ALL_CARD_URLS: string[] = [
  'assets/cards/1.jpg', 
  'assets/cards/2.jpg',
  'assets/cards/3.jpg',
  'assets/cards/4.jpg',
  'assets/cards/5.jpg',
  'assets/cards/6.jpg',
  'assets/cards/7.jpg',
  'assets/cards/8.jpg',
  'assets/cards/9.jpg',
  'assets/cards/10.jpg',
  'assets/cards/11.jpg',
  'assets/cards/12.jpg',
  'assets/cards/13.jpg',
  'assets/cards/14.jpg',
  'assets/cards/15.jpg',
  'assets/cards/16.jpg',
  'assets/cards/17.jpg',
  'assets/cards/18.jpg',
  'assets/cards/19.jpg',
  'assets/cards/20.jpg',
  'assets/cards/21.jpg',
  'assets/cards/22.jpg',
  'assets/cards/23.jpg',
  'assets/cards/24.jpg',
  'assets/cards/25.jpg',
  'assets/cards/26.jpg',
  'assets/cards/27.jpg',
  'assets/cards/28.jpg',
  'assets/cards/29.jpg',
  'assets/cards/30.jpg',
  'assets/cards/31.jpg',
  'assets/cards/32.jpg',
  'assets/cards/33.jpg',
  'assets/cards/34.jpg',
  'assets/cards/35.jpg',  
  'assets/cards/36.jpg',
  'assets/cards/37.jpg',  
  'assets/cards/38.jpg',
  'assets/cards/39.jpg',  
  'assets/cards/40.jpg',
  'assets/cards/41.jpg',
  'assets/cards/42.jpg',
  'assets/cards/43.jpg',
  'assets/cards/44.jpg',
  'assets/cards/45.jpg',
  'assets/cards/46.jpg',
  'assets/cards/47.jpg',
  'assets/cards/48.jpg',
  'assets/cards/49.jpg',
  'assets/cards/50.jpg',
  'assets/cards/51.jpg',
  'assets/cards/52.jpg',
  'assets/cards/53.jpg',
  'assets/cards/54.jpg',
  'assets/cards/55.jpg',
  'assets/cards/56.jpg',
  'assets/cards/57.jpg',
  'assets/cards/58.jpg',
  'assets/cards/59.jpg',
  'assets/cards/60.jpg',
  'assets/cards/61.jpg',
  'assets/cards/62.jpg',
  'assets/cards/63.jpg',
];

type Card = { imageUrl: string | null };

@Component({
  selector: 'app-my-binder',
  templateUrl: './my-binder.component.html',
  styleUrls: ['./my-binder.component.css']
})
export class MyBinderComponent implements OnInit {

  pages: Card[][] = [];
  currentPageIndex = 0;

  private touchStartX = 0;
  private touchEndX = 0;
  private readonly SWIPE_THRESHOLD = 50;

  ngOnInit(): void {
    this.createPagesFromUrls();
  }

  private createPagesFromUrls(): void {
    const cardsPerPage = 9;
    const pagedCards: Card[][] = [];
    for (let i = 0; i < ALL_CARD_URLS.length; i += cardsPerPage) {
      const pageUrls = ALL_CARD_URLS.slice(i, i + cardsPerPage);
      const pageCards: Card[] = pageUrls.map(url => ({ imageUrl: url }));
      while (pageCards.length < cardsPerPage) {
        pageCards.push({ imageUrl: null });
      }
      pagedCards.push(pageCards);
    }
    this.pages = pagedCards;
  }

  nextPage(): void {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
    }
  }

  previousPage(): void {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.nextPage();
    if (event.key === 'ArrowLeft') this.previousPage();
  }

  handleTouchStart(event: TouchEvent): void { this.touchStartX = event.touches[0].clientX; }
  handleTouchMove(event: TouchEvent): void { this.touchEndX = event.touches[0].clientX; }

  handleTouchEnd(): void {
    if (!this.touchStartX || !this.touchEndX) return;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > this.SWIPE_THRESHOLD) {
      if (diff > 0) this.nextPage();
      else this.previousPage();
    }
    this.touchStartX = 0;
    this.touchEndX = 0;
  }
}