/**
 * Created by idams on 6/16/15.
 */

var ProductCategoryRow = React.createClass({

    propTypes:{
        category: React.PropTypes.string
    },

    getDefaultProps:function(){
        return {
            category: null
        }
    },

    render:function(){
        return <tr><th colSpan="2">{this.props.category}</th></tr>
    }

})

var ProductRow = React.createClass({

    propTypes:{
        product: React.PropTypes.object
    },

    getDefaultProps:function(){
        return {
            product: {}
        }
    },

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

    propTypes:{
        products: React.PropTypes.array,
        filterText: React.PropTypes.string,
        inStockOnly: React.PropTypes.bool
    },

    getDefaultProps:function(){
        return {
            products: [],
            filterText: null,
            inStockOnly: false
        }
    },

    _filterProduct:function(product,regex){
        if( this.props.inStockOnly && !product.stocked) return false;

        if( regex ) return product.name.search(regex) > -1;

        return true;
    },

    render:function(){
        var rows = [];
        var lastCategory = null;
        var regex = this.props.filterText ? new RegExp(this.props.filterText,'i') : null;

        var self = this;

        this.props.products.forEach(function(product){
            if( self._filterProduct(product,regex) ){
                if( lastCategory !== product.category ){
                    rows.push(<ProductCategoryRow category={product.category} />);
                }
                rows.push(<ProductRow product={product} />);
                lastCategory = product.category;
            }
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

    propTypes:{
        filterText: React.PropTypes.string,
        inStockOnly: React.PropTypes.bool
    },

    getDefaultProps:function(){
        return {
            filterText: null,
            inStockOnly: false
        }
    },

    _handleChange:function(){
        this.props.onChange(this);
    },

    render:function(){
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this._handleChange} ref="text" />
                <label><input type="checkbox" checked={this.props.inStockOnly} onChange={this._handleChange} ref="stock" />show products in stock</label>
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
            filterText: null,
            inStockOnly: false
        }
    },
    getDefaultProps:function(){
      return {
          products: []
      }
    },

    _handleChange:function(child){
        var text = React.findDOMNode(child.refs.text).value.trim();
        var checked = React.findDOMNode(child.refs.stock).checked;

        this.setState({filterText:text,inStockOnly:checked});
    },

    render:function(){
        return (
            <div classNam="productTable">
                <SearchBar
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
                    onChange = {this._handleChange}
                />
                <ProductTable
                    products = {this.props.products}
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
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