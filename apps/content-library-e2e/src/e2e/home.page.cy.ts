describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Page Layout', () => {
    it('should display the page title', () => {
      cy.get('.app-home__title').should('be.visible').invoke('text').then(text => {
        expect(text.toLowerCase()).to.include('home');
      });
    });

    it('should display the subtitle', () => {
      cy.get('.app-home__subtitle').should('be.visible').invoke('text').then(text => {
        expect(text.toLowerCase()).to.include('top 10 popular movies');
      });
    });

    it('should have main content container', () => {
      cy.get('.app-home__content').should('be.visible');
    });
  });

  describe('Movie Grid', () => {
    it('should display the movie grid', () => {
      cy.get('.app-home__grid').should('be.visible');
    });

    it('should load and display movies', () => {
      cy.get('.app-home__grid-item').should('have.length.at.least', 1).and('be.visible');
    });

    it('should display multiple movies', () => {
      cy.get('app-movie').should('have.length.greaterThan', 1)
        .each($movie => {
          cy.wrap($movie).should('be.visible');
        });
    });

    it('should display 10 movies', () => {
      cy.get('app-movie').should('have.length', 10);
    });
  });

  describe('Last Visited Loading', () => {
    it('should show loading placeholder', () => {
      cy.visit('/home');

      cy.contains('Loading last visited movies...').should('be.visible');
    });
  });

  describe('Interactions', () => {
    it('should navigate to detail page when clicking on movie', () => {
      cy.get('app-movie').first().as('firstMovie');

      cy.get('@firstMovie')
        .then($movie => {
          cy.wrap($movie).as('clickedMovie');
        });

      cy.get('@firstMovie').should('be.visible').click();

      cy.url().should('include', '/list/');

      cy.get('.app-details__info-title', { timeout: 10000 }).should('be.visible');
    });

    it('should add clicked movie to last visited', () => {
      cy.get('app-movie').first().as('firstMovie');

      cy.get('@firstMovie').find('.app-movie__title')
        .then(($el: JQuery<HTMLElement>) => {
          const movieTitle = $el.text().trim();

          cy.get('@firstMovie').click();

          cy.url().should('include', '/list/');

          cy.get('app-last-visited', { timeout: 10000 }).should('be.visible');

          cy.get('app-movie').should('be.visible')
            .within(() => {
              cy.get('.app-movie__title').should('be.visible').and('have.text', movieTitle);
            });
        });
    });
  });
});
