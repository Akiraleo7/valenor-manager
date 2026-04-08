Para o desenvolvimento do sistema Valenor Manager, optei por utilizar um banco de dados relacional, visando garantir organização, integridade e facilidade na manipulação das informações.

Além disso, escolhi utilizar o MySQL como sistema gerenciador de banco de dados, devido à sua ampla utilização no mercado, facilidade de integração com aplicações desenvolvidas em C# e bom desempenho para aplicações de pequeno e médio porte. Outro fator relevante foi a grande quantidade de documentação e suporte disponíveis, o que facilita o desenvolvimento e a resolução de possíveis problemas.

Inicialmente, defini as principais entidades do sistema com base nas necessidades do negócio, que incluem o controle de produtos e o registro de vendas.

Criei a tabela Produto com o objetivo de armazenar as informações dos itens disponíveis em estoque, incluindo nome, preço e quantidade disponível.

Em seguida, desenvolvi a tabela Venda, responsável por registrar as transações realizadas, contendo a data da venda e o valor total correspondente.

Durante a modelagem, identifiquei a necessidade de representar o relacionamento entre produtos e vendas, uma vez que uma única venda pode conter diversos produtos, assim como um mesmo produto pode estar presente em várias vendas. Para resolver esse cenário, implementei a tabela ItemVenda, que atua como uma entidade intermediária.

Essa tabela foi projetada para armazenar a relação entre venda e produto, incluindo também a quantidade de itens vendidos e o preço unitário no momento da transação.

A decisão de armazenar o preço unitário diretamente na tabela ItemVenda foi tomada com o objetivo de garantir a integridade histórica dos dados, evitando inconsistências caso o valor dos produtos seja alterado no futuro.

Além disso, utilizei chaves primárias para identificação única dos registros e chaves estrangeiras para garantir a integridade referencial entre as tabelas. Também apliquei restrições como NOT NULL em campos obrigatórios, assegurando maior consistência nos dados armazenados.

Por fim, optei por utilizar a cláusula ON DELETE CASCADE no relacionamento entre Venda e ItemVenda, garantindo que, ao excluir uma venda, todos os itens associados a ela sejam removidos automaticamente, mantendo a consistência do banco de dados.
