/**
 * Created by idams on 6/16/15.
 */

var ProductCategoryRow = React.createClass({

    render:function(){
        return <tr><th colSpan="2">{this.props.category}</th></tr>
    }

})

var ProductRow = React.createClass({

    render:function(){
        var name = this.props.product.stocked ? this.props.product.name :
            <span style={{color:'red'}}>{this.props.product.name}</span>;
        return (
            <tr>
                <td colSpan="1">{name}</td>
                <td colSpan="1">{this.props.product.price}</td>
            </tr>
        )
    }
})

var ProductTable = React.createClass({

    render:function(){
        var rows = [];
        var lastCategory = null;

        this.props.products.forEach(function(product){
            if( lastCategory !== product.category ){
                rows.push(<ProductCategoryRow category={product.category} />);
            }
            rows.push(<ProductRow product={product} />);
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
})

var SearchBar = React.createClass({

    handleTextChange:function(e){
        var text = e.target.value;


    },

    render:function(){
        return (
            <form>
                <input type="text" placeholder="Search..." onChange={this.handleTextChange} />
                <input type="checkbox" checked={this.props.inStockOnly} />show products in stock
            </form>
        )
    }
})

var FilterableProductTable = React.createClass({

    propTypes:{
        products: React.PropTypes.array
    },

    getInitialState:function(){
        return {
            filterText:'',
            inStockOnly:false
        }
    },
    getDefaultProps:function(){
      return {
          products: []
      }
    },

    render:function(){
        return (
            <div classNam="productTable">
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        )
    }
})


var PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

React.render(<FilterableProductTable products={PRODUCTS} />, document.body);