import login from '../fixtures/login.json';

describe('Constructor E2E tests', () => {
  beforeEach(() => {
    cy.viewport(1400, 900);
    cy.visit('http://localhost:3000/');
  });

  const ingredientItem = '[class^=ingredient-item_item]';

  it('show and hide ingredient details modal', () => {
    cy.get(ingredientItem).first().click();
    cy.get('[class^=ingredient-details_ingredientDetails]').contains(
      'Детали ингредиента'
    );
    cy.get('[class^=modal_closeIcon]').click();
    cy.get('[class^=modal_closeIcon]').should('not.exist');
  });

  it('create order', () => {
    cy.get('[data-test="ingredient-group-bun"]').first().as('listOfBuns');
    cy.get('@listOfBuns').eq(0).find(ingredientItem).first().as('bun');
    cy.get('[data-test="ingredient-group-sauce"]').as('listOfSauces');
    cy.get('@listOfSauces').eq(0).find(ingredientItem).first().as('sauce');
    cy.get('[data-test="constructor-drop-target-bun"]').first().as('bun-desc');
    cy.get('[data-test="constructor-drop-target-notBun"]').as(
      'ingredient-desc'
    );
    cy.contains('Выбери булку');
    cy.contains('Выбери начинку');

    cy.get('@bun').trigger('dragstart');
    cy.get('@bun-desc').trigger('drop');
    cy.get('@sauce').trigger('dragstart');
    cy.get('@ingredient-desc').trigger('drop');

    cy.get('[data-test="order-button"]').as('order-button');
    cy.get('@order-button').click();

    cy.contains('Авторизироваться').click();

    cy.get('[name=email]').type(login.email);
    cy.get('[name=password]').type(login.password);
    cy.contains('button', 'Войти').click();
    cy.getAllLocalStorage().get('value').should('not.be.empty');

    cy.get('button').contains('Оформить заказ').click();

    cy.contains('идентификатор заказа');
    cy.contains('Ваш заказ начали готовить');

    // eslint-disable-next-line
    cy.get('[data-test="modal-close-icon"]').wait(20000).click();
    cy.contains('Выбери булку');
    cy.contains('Выбери начинку');
  });
});
