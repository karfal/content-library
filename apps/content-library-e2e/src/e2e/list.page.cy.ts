describe('Movie List Page', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  describe('Page Layout', () => {
    it('should display the page title', () => {
      cy.get('.app-list__title')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.include('movie list');
        });
    });

    it('should have main content container', () => {
      cy.get('.app-list__content')
        .should('be.visible');
    });

    it('should have search component', () => {
      cy.get('.app-list__search')
        .should('be.visible');
    });

    it('should display the movie grid', () => {
      cy.get('.app-list__grid')
        .should('be.visible');
    });

    it('should load and display movies', () => {
      cy.get('.app-list__grid-item')
        .should('have.length.at.least', 1)
        .and('be.visible');
    });
  });

  describe('Movie List Search', () => {
    it('should search for movies', () => {
      //wait for form control to load
      cy.wait(100);

      cy.get('.app-search__input')
        .should('be.visible')
        .should('not.be.disabled')
        .type('batman')
        .should('have.value', 'batman');

      //wait for delay
      cy.wait(500);

      //trigger change detection
      cy.get('body').click();

      cy.get('.app-movie__title').should('exist')
        .each($title => {
          cy.wrap($title)
            .should('contain.text', 'Batman');
        });
    });

    it('should clear search when clear button is clicked', () => {
      //wait for form control to load
      cy.wait(100);

      cy.get('.app-search__input').type('batman');
      cy.get('.app-search__clear').click();
      cy.get('.app-search__input')
        .should('have.value', '');
    });

    it('should select genres and update url params', () => {
      //wait for component to load
      cy.wait(100);

      cy.get('.app-search__dropdown-toggle').click();
      cy.get('.app-search__dropdown-checkbox').eq(0).click();
      cy.get('.app-search__dropdown-checkbox').eq(1).click();

      cy.get('.app-search__dropdown-label').eq(0).invoke('text').then(genre1 => {
        cy.get('.app-search__dropdown-label').eq(1).invoke('text').then(genre2 => {
          cy.url().should('include', genre1.trim());
          cy.url().should('include', genre2.trim());
        });
      });
    });

    it('should clear dropdown selections and hide dropdown when clear button is clicked', () => {
      //wait for component to load
      cy.wait(100);

      cy.get('.app-search__dropdown-toggle').click();
      cy.get('.app-search__dropdown-checkbox').eq(0).click();
      cy.get('.app-search__dropdown-checkbox').eq(1).click();

      cy.get('.app-search__dropdown-checkbox').eq(0).should('be.checked');
      cy.get('.app-search__dropdown-checkbox').eq(1).should('be.checked');

      cy.get('.app-search__clear').click();

      cy.get('.app-search__dropdown-menu').should('not.exist');

      cy.url().then(url => {
        expect(url).to.not.include('genres');
      });

      cy.get('.app-search__dropdown-toggle').click();
      cy.get('.app-search__dropdown-checkbox').eq(0).should('not.be.checked');
      cy.get('.app-search__dropdown-checkbox').eq(1).should('not.be.checked');

      cy.get('.app-search__clear').click();

      cy.get('.app-search__dropdown-menu').should('not.exist');
    });

  });
});
