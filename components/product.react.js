/**
 * Created by idams on 6/16/15.
 */

class ProductCategoryRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <tr><th colSpan="2">{this.props.category}</th></tr>
    }
}
ProductCategoryRow.propTypes = {category: React.PropTypes.string};
ProductCategoryRow.defaultProps = {category: null};

class ProductRow extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        var name = this.props.product.stocked ? this.props.product.name :
            <span style={{color:'red'}}>{this.props.product.name}</span>;
        return (
            <tr>
                <td colSpan="1">{name}</td>
                <td colSpan="1">{this.props.product.price}</td>
            </tr>
        )
    }
}
ProductRow.propTypes = {product: React.PropTypes.object};
ProductRow.defaultProps = {product: {}};

class ProductTable extends React.Component{

    constructor(props){
        super(props);
    }

    _filterProduct(product,regex){
        if( this.props.inStockOnly && !product.stocked) return false;

        if( regex ) return product.name.search(regex) > -1;

        return true;
    }

    render(){
        var rows = [];
        var lastCategory = null;
        var regex = this.props.filterText ? new RegExp(this.props.filterText,'i') : null;

        this.props.products.forEach(function(product){
            if( this._filterProduct(product,regex) ){
                if( lastCategory !== product.category ){
                    rows.push(<ProductCategoryRow category={product.category} />);
                }
                rows.push(<ProductRow product={product} />);
                lastCategory = product.category;
            }
        }.bind(this));

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
}
ProductTable.propTypes = {
    products: React.PropTypes.array,
    filterText: React.PropTypes.string,
    inStockOnly: React.PropTypes.bool
};
ProductTable.defaultProps = {
    products: [],
    filterText: null,
    inStockOnly: false
};

class SearchBar extends React.Component{

    constructor(props){
        super(props);

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(){
        this.props.onChange(this);
    }

    render(){
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this._handleChange} ref="text" />
                <label><input type="checkbox" checked={this.props.inStockOnly} onChange={this._handleChange} ref="stock" />show products in stock</label>
            </form>
        )
    }
}
SearchBar.propTypes = {
    filterText: React.PropTypes.string,
    inStockOnly: React.PropTypes.bool,
    onChange: React.PropTypes.func
};
SearchBar.defaultProps = {
    filterText: null,
    inStockOnly: false,
    onChange: null
};


class FilterableProductTable extends React.Component{

    constructor(props){
        super(props);

        this.state = {filterText:null, inStockOnly:false};
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(child){
        var text = React.findDOMNode(child.refs.text).value.trim();
        var checked = React.findDOMNode(child.refs.stock).checked;

        this.setState({filterText:text,inStockOnly:checked});
    }

    render(){
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
}
FilterableProductTable.propTypes = {
    products: React.PropTypes.array
};
FilterableProductTable.defaultProps = {
    products: []
};



var PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

React.render(<FilterableProductTable products={PRODUCTS} />, document.body);