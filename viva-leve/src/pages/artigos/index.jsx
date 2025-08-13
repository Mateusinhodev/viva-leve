import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import "./artigo.css"

export default function Artigo() {
    return(
        <section className="artigo-container">
            <h2 className="artigos-title">Artigos Relacionados</h2>
            <p className="artigos-txt">Aqui você encontra receitas balanceadas, dicas nutricionais e artigos sobre bem-estar para apoiar a sua jornada de vida saudável. Nosso objetivo é trazer informações confiáveis e fáceis de aplicar no seu dia a dia.</p>
                <div className="cards-container">
                    <Card className="max-w-[24rem] overflow-hidden">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                        >
                            <img
                            src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*XiIyNNIe3XRKuLuwYzbN0g.jpeg"
                            alt="ui/ux review check"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h4" color="blue-gray">
                            A alimentação é essencial para melhorar a qualidade de vida. Difícil é mudar!
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-3">
                            <Button size="lg" fullWidth={true}>
                            <a href="https://medium.com/@dailyfoodbrasil/a-alimenta%C3%A7%C3%A3o-%C3%A9-essencial-para-melhorar-a-qualidade-de-vida-dif%C3%ADcil-%C3%A9-mudar-804004caa9f">Ler Artigo</a> 
                            </Button>
                        </CardFooter>
                        
                    </Card>

                    <Card className="max-w-[24rem] overflow-hidden">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                        >
                            <img
                            src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*OYY60ARrS2X_iclz"
                            alt="ui/ux review check"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h4" color="blue-gray">
                            Receitas Detox Deliciosas para Transformar Sua Jornada de Emagrecimento
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-3">
                            <Button size="lg" fullWidth={true}>
                            <a href="https://medium.com/@alimentacaoconscientesempre/receitas-detox-deliciosas-para-transformar-sua-jornada-de-emagrecimento-26adfd2f3cb6">Ler Artigo</a> 
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="max-w-[24rem] overflow-hidden">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none"
                        >
                            <img
                            src="https://miro.medium.com/v2/resize:fit:786/format:webp/0*8HWGxMMDfri6ATje.jpg"
                            alt="ui/ux review check"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h4" color="blue-gray">
                            Como Emagrecer com Saúde em 6 Semanas: Eu Perdi 10 Quilos com Este Método!
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-3">
                            <Button size="lg" fullWidth={true}>
                            <a href="https://medium.com/@suasaudetotal/como-emagrecer-com-sa%C3%BAde-em-6-semanas-eu-perdi-10-quilos-com-este-m%C3%A9todo-aaf214c186e">Ler Artigo</a>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
        </section>
    )
}