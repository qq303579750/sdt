package org.sdt.module.basicdata.product.service.register;

import java.util.ArrayList;
import java.util.List;

import org.sdt.module.basicdata.product.model.ProductCategory;
import org.springframework.stereotype.Service;
import org.sdt.module.system.service.RegisterService;
import org.sdt.platform.util.XMLFactory;
import org.sdt.platform.util.XMLUtils;

@Service
public class RegisteProductCategory extends RegisterService<ProductCategory> {
	private ProductCategory category = null;

	@Override
	protected void registe() {
		String xml = "/data/productCategory.xml";
		LOG.info("注册【" + xml + "】文件");
		LOG.info("验证【" + xml + "】文件");
		boolean pass = XMLUtils.validateXML(xml);
		if (!pass) {
			LOG.info("验证没有通过，请参考dtd文件");
			return;
		}
		LOG.info("验证通过");
		XMLFactory factory = new XMLFactory(ProductCategory.class);
		category = factory.unmarshal(RegisteProductCategory.class.getResourceAsStream(xml));

		assembleCategory(category);
		registeCategory(category);
	}

	@Override
	protected List<ProductCategory> getRegisteData() {
		ArrayList<ProductCategory> data = new ArrayList<>();
		data.add(category);
		return data;
	}

	private void assembleCategory(ProductCategory category) {
		for (ProductCategory child : category.getChild()) {
			child.setParent(category);
			registeCategory(child);
		}
	}

	private void registeCategory(ProductCategory category) {
		serviceFacade.create(category);
	}
}
