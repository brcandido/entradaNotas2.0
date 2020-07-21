let nomeAluno = document.getElementById("aluno")
let notaP1 = document.getElementById("nota1")
let notaP2 = document.getElementById("nota2")
let notaP3 = document.getElementById("nota3")
let notaP4 = document.getElementById("nota4")
let premio = document.getElementById("premio")
let aprovacao = ''
let turma = []

function Aluno(nome, nota1, nota2, nota3, nota4, mediaAluno, situacao){
    this.nome = nome;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.nota4 = nota4;
    this.mediaAluno = mediaAluno;
    this.situacao = situacao;
}

function entraAluno(){
    let media = (parseFloat(notaP1.value)+parseFloat(notaP2.value)+parseFloat(notaP3.value)+parseFloat(notaP4.value))/4
    if(parseFloat(notaP1.value)>=0 && parseFloat(notaP1.value)<=10 && parseFloat(notaP2.value)>=0 && parseFloat(notaP2.value)<=10 && parseFloat(notaP3.value)>=0 && parseFloat(notaP3.value)<=10 && parseFloat(notaP4.value)>=0 && parseFloat(notaP4.value)<=10){
        if(!isNaN(parseFloat(notaP1.value)) && !isNaN(parseFloat(notaP2.value)) && !isNaN(parseFloat(notaP3.value)) && !isNaN(parseFloat(notaP4.value)) && !isNaN(media)){        
            if (media >= 7 && media <=10){
                aprovacao = 'Aprovado'        
            }        
            else{
                aprovacao = 'Reprovado'               
            }
            let aluno = new Aluno(nomeAluno.value, notaP1.value, notaP2.value, notaP3.value, notaP4.value, media, aprovacao)
            turma.push(aluno)
        }
        else{
            window.alert("Favor preencher todas as informações.")        
        }
    }
    else{
        window.alert('As notas devem estar entre 0 e 10!')
    }
    console.log(turma)
    
    nomeAluno.value = null
    notaP1.value = null
    notaP2.value = null
    notaP3.value = null
    notaP4.value = null
}



function geraTabela(){
    let tabelaNotas = document.getElementById("tabelaNotas")
    let maiorMedia = 0
    let melhorAluno = ''
    if(turma.length >= 15){
        let cabecalho = ["Nome","Prova 1", "Prova 2", "Prova 3", "Prova 4", "Média Final", "Aprovação"];
        let headTabela = document.createElement('THEAD');
        let trHead = document.createElement("TR");
        
        if(document.getElementById("tabelaNotas").rows.length != 0){   
            tabelaNotas.removeChild(tabelaNotas.getElementsByTagName("thead")[0])
        }
        if(document.getElementById("tabelaNotas").tBodies.length != 0){
            tabelaNotas.removeChild(tabelaNotas.getElementsByTagName("tbody")[0]);
        }        
        
        for (i=0; i<cabecalho.length; i++){
            let th = document.createElement("TH")
            let thText = document.createTextNode(cabecalho[i])
            th.appendChild(thText)
            trHead.appendChild(th)
        }
        headTabela.appendChild(trHead)
        tabelaNotas.appendChild(headTabela)

        let corpoTabela = document.createElement("TBODY")
        corpoTabela.setAttribute("id", "corpo-tabela")

        for(j=0; j<turma.length; j++){
            if(turma[j].mediaAluno > maiorMedia && turma[j].mediaAluno >=7){
                maiorMedia = turma[j].mediaAluno
                melhorAluno = turma[j].nome
            }   
            
            let tr = document.createElement("TR")
            for (elemento in turma[j]){                
                let td = document.createElement("TD")
                let tdText = document.createTextNode(turma[j][elemento])
                td.appendChild(tdText)
                tr.appendChild(td)
            }
            corpoTabela.appendChild(tr)
        }
        tabelaNotas.appendChild(corpoTabela)
    }
    else{
        window.alert('A turma deve conter NO MÍNIMO 15 alunos!')
    }
    if(maiorMedia != 0){    
        let parabens = document.createTextNode(`Parabéns, ${melhorAluno} por ser aprovado com ${maiorMedia}. A maior média da turma!`)
        premio.appendChild(parabens)
    }
}
