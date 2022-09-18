describe('Clip', () => {
    it('Should play clip', () => {
        cy.visit('/');
        cy.get('app-clips-list > .grid a:first').click();
        cy.get('video')
            .should('have.prop', 'paused', true)
            .and('have.prop', 'ended', false)
            .should($video => {
                expect($video[0].duration).to.be.gt(0)
            })
            .then($video => {
                $video[0].playbackRate = 2
                $video[0].play()
            });
        cy.get('video')
            .should('have.prop', 'paused', false)
            .and('have.prop', 'ended', false)
    });
});