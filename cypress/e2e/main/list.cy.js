/* eslint-disable no-undef */
describe('home page', () => {
    before(() => {
        cy.visit("http://localhost:3001")
        cy.url().should("include", "localhost:3001")
    })

    it("왼쪽 버튼 누를시 기존 월 달 보여주기", () => {
        cy.get(".head_btn_left").click()
    })

})
