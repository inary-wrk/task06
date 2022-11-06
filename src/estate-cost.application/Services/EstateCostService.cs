using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using estate_cost.application.Common.Interfaces;

namespace estate_cost.application.Services
{
    internal class EstateCostService : IEstateCostService
    {
        void IEstateCostService.ProcessingUploadedFile(Uri path, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
