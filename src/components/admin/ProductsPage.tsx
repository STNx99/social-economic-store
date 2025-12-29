import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'
import { mockProducts } from '@/data/mock/products'

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products] = useState(mockProducts)

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h2>
            <p className="text-muted-foreground">
              Quản lý danh sách sản phẩm, giá cả và tồn kho
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm sản phẩm
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm sản phẩm mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin sản phẩm để thêm vào danh sách
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tên sản phẩm</label>
                  <Input placeholder="Nhập tên sản phẩm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Danh mục</label>
                  <Input placeholder="Chọn danh mục" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Giá</label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mô tả</label>
                  <Input placeholder="Mô tả sản phẩm" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button>Thêm sản phẩm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách sản phẩm</CardTitle>
                <CardDescription>
                  Tổng cộng {filteredProducts.length} sản phẩm
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0)
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.imageUrls[0]}
                          alt={product.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.categoryName}</TableCell>
                      <TableCell>{product.basePrice.toLocaleString('vi-VN')}₫</TableCell>
                      <TableCell>
                        <Badge variant={totalStock > 50 ? 'default' : totalStock > 0 ? 'secondary' : 'destructive'}>
                          {totalStock} sp
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{product.rating}</span>
                          <span className="text-muted-foreground">({product.reviewCount})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.isActive ? 'default' : 'secondary'}>
                          {product.isActive ? 'Hoạt động' : 'Tạm ngưng'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Tổng sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                Sản phẩm trong hệ thống
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sắp hết hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {products.filter(p => {
                  const total = p.variants.reduce((sum, v) => sum + v.stock, 0)
                  return total > 0 && total <= 20
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Sản phẩm cần nhập thêm
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hết hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {products.filter(p => {
                  const total = p.variants.reduce((sum, v) => sum + v.stock, 0)
                  return total === 0
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Sản phẩm không có hàng
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
