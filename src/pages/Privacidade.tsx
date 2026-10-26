import { PageBanner } from "@/components/layout/PageBanner";
import { SITE } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useMotion";

/**
 * POLÍTICA DE PRIVACIDADE
 * ⚠️ MINUTA criada para o site novo (o site antigo tinha o link quebrado e a página não existia).
 * O escritório deve revisar o texto antes de publicar. Para editar, altere os parágrafos abaixo.
 */
export default function Privacidade() {
  useDocumentTitle("Política de Privacidade – LBA – Assessoria Jurídica");

  return (
    <>
      <PageBanner title="Política de Privacidade" />
      <section className="py-[90px] max-md:py-[60px]">
        <div className="lba-container">
          <div className="lba-prose mx-auto max-w-[820px]">
            <p>
              Esta Política explica como a <strong>{SITE.name}</strong> ({SITE.legalName}), com endereço na{" "}
              {SITE.address}, trata os dados pessoais de quem visita este site ou entra em contato conosco, em
              conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).
            </p>

            <h2>1. Quais dados coletamos</h2>
            <p>
              Coletamos apenas os dados que você informa no formulário de contato: nome, e-mail, telefone, tema e a
              mensagem escrita. Não pedimos documentos nem informações sensíveis pelo site — por favor, não as envie
              pelo formulário.
            </p>

            <h2>2. Para que usamos</h2>
            <p>
              Usamos esses dados exclusivamente para responder à sua solicitação e, se for o caso, para os
              procedimentos preliminares de uma eventual contratação dos nossos serviços (art. 7º, incisos I e V, da
              LGPD).
            </p>

            <h2>3. Compartilhamento</h2>
            <p>
              Não vendemos nem cedemos seus dados. Eles ficam armazenados em serviços de hospedagem e banco de dados
              contratados pelo escritório, que atuam apenas como operadores e seguem padrões de segurança da
              informação.
            </p>

            <h2>4. Sigilo profissional</h2>
            <p>
              As informações compartilhadas conosco são tratadas com o dever de sigilo profissional previsto no
              Estatuto da Advocacia e no Código de Ética e Disciplina da OAB.
            </p>

            <h2>5. Por quanto tempo guardamos</h2>
            <p>
              Mantemos os dados pelo tempo necessário para atender à sua solicitação ou para cumprir obrigações legais
              e regulatórias. Depois disso, eles são excluídos ou anonimizados.
            </p>

            <h2>6. Seus direitos</h2>
            <p>
              Você pode, a qualquer momento, pedir a confirmação da existência de tratamento, o acesso, a correção, a
              anonimização, a portabilidade ou a eliminação dos seus dados, além de revogar o consentimento (art. 18
              da LGPD). Basta escrever para{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Este site não utiliza cookies de publicidade. Podem ser usados apenas recursos técnicos do navegador
              necessários para o funcionamento das páginas.
            </p>

            <h2>8. Alterações</h2>
            <p>
              Esta Política pode ser atualizada para refletir mudanças legais ou nos nossos serviços. A versão vigente
              estará sempre disponível nesta página.
            </p>

            <p className="text-[15px] text-lba-steel">Última atualização: outubro de 2026.</p>
          </div>
        </div>
      </section>
    </>
  );
}
