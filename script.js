function atualizarRodape() {
    const linhas = document.querySelectorAll("#tabelaAlunos tbody tr");

    let totalAlunos = linhas.length;
    let somaMedias = 0;
    let somaFreq = 0;

    linhas.forEach(linha => {
        somaMedias += parseFloat(linha.children[4].textContent);
        somaFreq += parseFloat(linha.children[5].textContent);
    });

    document.getElementById("totalAlunos").textContent = totalAlunos;
    document.getElementById("mediaTurma").textContent = (somaMedias / totalAlunos).toFixed(2);
    document.getElementById("freqTurma").textContent = (somaFreq / totalAlunos).toFixed(2) + "%";
}

atualizarRodape();

document.getElementById("formAluno").addEventListener("submit", function(e){
    e.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let n1 = parseFloat(document.getElementById("nota1").value);
    let n2 = parseFloat(document.getElementById("nota2").value);
    let n3 = parseFloat(document.getElementById("nota3").value);
    let freq = parseFloat(document.getElementById("freq").value);

    if (nome === "" || [n1, n2, n3].some(n => n < 0 || n > 10) || freq < 0 || freq > 100) {
        alert("Dados inválidos.");
        return;
    }

    let media = ((n1 + n2 + n3) / 3).toFixed(2);
    let situacao = (media >= 7 && freq >= 75) ? "Aprovado" : (media >= 5 ? "Recuperação" : "Reprovado");

    let tabela = document.querySelector("#tabelaAlunos tbody");
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${nome}</td>
        <td>${n1}</td>
        <td>${n2}</td>
        <td>${n3}</td>
        <td>${media}</td>
        <td>${freq}%</td>
        <td>${situacao}</td>
    `;

    tabela.appendChild(tr);
    atualizarRodape();
    document.getElementById("formAluno").reset();
});
