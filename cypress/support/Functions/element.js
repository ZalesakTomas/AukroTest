export function checkIfElementExists(element){
    // Workaround - Assert that element exist without failing test

    return new Promise((resolve,reject)=>{
        cy.get('body')
            .then((body) => {
                if (body.find(element).length) {
                    resolve()
                }
                else {
                    reject()
                }
        })
    })
}
