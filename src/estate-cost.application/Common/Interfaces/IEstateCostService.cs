using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace estate_cost.application.Common.Interfaces
{
    public interface IEstateCostService
    {
        public void ProcessingUploadedFile(Uri path, CancellationToken cancellationToken = default);
    }
}
